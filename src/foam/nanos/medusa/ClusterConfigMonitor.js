/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.medusa',
  name: 'ClusterConfigMonitor',

  documentation: 'NOTE: do not start with cronjob. This process starts the ClusterConfigPingSing which polls the Mediators and Nodes and will initiate Replay, and Elections.',

  implements: [
    'foam.core.ContextAgent',
    'foam.nanos.NanoService',
    'foam.nanos.auth.EnabledAware'
  ],

  javaImports: [
    'foam.core.Agency',
    'foam.core.AgencyTimerTask',
    'foam.core.ContextAgent',
    'foam.core.X',
    'foam.dao.DAO',
    'foam.dao.Sink',
    'foam.dao.ArraySink',
    'static foam.mlang.MLang.AND',
    'static foam.mlang.MLang.EQ',
    'static foam.mlang.MLang.MAX',
    'static foam.mlang.MLang.NEQ',
    'static foam.mlang.MLang.NOT',
    'foam.mlang.sink.Max',
    'foam.nanos.logger.PrefixLogger',
    'foam.nanos.logger.Logger',
    'java.util.ArrayList',
    'java.util.List',
    'java.util.Timer'
  ],

  axioms: [
    foam.pattern.Singleton.create(),
    {
      name: 'javaExtras',
      buildJavaClass: function(cls) {
        cls.extras.push(foam.java.Code.create({
          data: `
  protected static Timer timer_ = null;
  protected static Boolean isRunning_ = false;
          `
        }));
      }
    }
  ],

  properties: [
    {
      name: 'enabled',
      class: 'Boolean',
      value: true
    },
    {
      name: 'timerInterval',
      class: 'Long',
      value: 3000
    },
    {
      name: 'initialTimerDelay',
      class: 'Int',
      value: 5000
    },
    {
      name: 'pingTimeout',
      class: 'Int',
      value: 3000
    },
    {
      name: 'logger',
      class: 'FObjectProperty',
      of: 'foam.nanos.logger.Logger',
      visibility: 'HIDDEN',
      transient: true,
      javaFactory: `
        return new PrefixLogger(new Object[] {
          this.getClass().getSimpleName()
        }, (Logger) getX().get("logger"));
      `
    }
  ],

  methods: [
    {
      documentation: 'Start as a NanoService',
      name: 'start',
      javaCode: `
      getLogger().info("start");
      ClusterConfigSupport support = (ClusterConfigSupport) getX().get("clusterConfigSupport");
      if ( timer_ != null ) {
        getLogger().warning("multiple instances", new Exception());
        return;
      }
      timer_ = new Timer(this.getClass().getSimpleName(), true);
      timer_.scheduleAtFixedRate(
        new AgencyTimerTask(getX(), support.getThreadPoolName(), this),
        getInitialTimerDelay(),
        getTimerInterval());
      `
    },
    {
      name: 'execute',
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ],
      javaCode: `
      if ( ! getEnabled() ) {
        return;
      }
      getLogger().debug("execute");
      synchronized ( timer_ ) {
       if ( isRunning_ ) {
          getLogger().debug("already running");
          return;
        }
        isRunning_ = true;
      }

      try {
        ClusterConfigSupport support = (ClusterConfigSupport) x.get("clusterConfigSupport");
        ClusterConfig config = support.getConfig(x, support.getConfigId());
        // getLogger().debug("execute", config.getId(), config.getType().getLabel(), config.getStatus().getLabel());
        if ( config.getType() == MedusaType.NODE ) {
           if ( config.getEnabled() &&
                config.getStatus() == Status.OFFLINE ) {

            // // Wait for own replay to complete,
            // // then set node ONLINE.
            ReplayingInfo replaying = (ReplayingInfo) x.get("replayingInfo");
            if ( replaying.getStartTime() == null ) {
              replaying.setStartTime(new java.util.Date());
            }
            DAO dao = ((DAO) x.get("medusaNodeDAO"));
            if ( replaying.getEndTime() == null ) {
              replaying.setEndTime(new java.util.Date());
              Max max = (Max) dao.select(MAX(MedusaEntry.INDEX));
              replaying.setReplaying(false);
              if ( max != null &&
                   max.getValue() != null ) {
                replaying.setIndex((Long)max.getValue());
                replaying.setReplayIndex((Long)max.getValue());
              }
            }

            // TODO: deal with digest failures - and Node taking self OFFLINE.
            // this timer will continually set it back to ONLINE.

            config = (ClusterConfig) config.fclone();
            config.setStatus(Status.ONLINE);
            ((DAO) x.get("localClusterConfigDAO")).put(config);
          }
        } else if ( config.getType() != MedusaType.MEDIATOR &&
                    config.getStatus() == Status.OFFLINE ) {
          config = (ClusterConfig) config.fclone();
          config.setStatus(Status.ONLINE);
          ((DAO) x.get("localClusterConfigDAO")).put(config);
        } else if ( support.getStandAlone() ) {
          // standalone mode.
          config = (ClusterConfig) config.fclone();
          config.setStatus(Status.ONLINE);
          config.setIsPrimary(true);
          ((DAO) x.get("localClusterConfigDAO")).put(config);

          DAO dao = (DAO) x.get("localClusterConfigDAO");
          List<ClusterConfig> nodes = (ArrayList) ((ArraySink) dao.where(
            AND(
              EQ(ClusterConfig.ZONE, 0),
              EQ(ClusterConfig.TYPE, MedusaType.NODE),
              EQ(ClusterConfig.ENABLED, true),
              EQ(ClusterConfig.STATUS, Status.OFFLINE)
            ))
          .select(new ArraySink())).getArray();
          for ( ClusterConfig node : nodes ) {
            node = (ClusterConfig) node.fclone();
            node.setStatus(Status.ONLINE);
            dao.put_(x, node);
          }
          // no need for ping timer in standalone mode.
          timer_.cancel();
          timer_.purge();
          getLogger().debug("timer", "cancel");
          return;
        }

        // TODO: Non-Mediators don't need to ping anything, just useful for reporting and network graph - the ping time could be reduced - see mn/services.jrl

        DAO dao = (DAO) x.get("localClusterConfigDAO");
        dao = dao.where(
          AND(
            EQ(ClusterConfig.ENABLED, true),
            NOT(EQ(ClusterConfig.ID, support.getConfigId())),
            EQ(ClusterConfig.REALM, config.getRealm())
          ));
        dao.select(new ClusterConfigPingSink(x, dao, getPingTimeout()));
      } finally {
        synchronized ( timer_ ) {
          isRunning_ = false;
        }
        getLogger().debug("execute", "exit");
      }

     // See ConsensusDAO for Mediators - they transition to ONLINE when replay complete.
      `
    }
  ]
});
