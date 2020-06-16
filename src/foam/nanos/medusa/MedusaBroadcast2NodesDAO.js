/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.medusa',
  name: 'MedusaBroadcast2NodesDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: `Broadcast MedusaEntry to Nodes. Each entry is distributed to set of nodes for redundancy and consensus.`,

  javaImports: [
    'foam.core.FObject',
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.dao.DOP',
    'static foam.mlang.MLang.AND',
    'static foam.mlang.MLang.EQ',
    'static foam.mlang.MLang.OR',
    'foam.mlang.predicate.Predicate',
    'foam.nanos.logger.PrefixLogger',
    'foam.nanos.logger.Logger',
    'foam.nanos.pm.PM',
    'java.util.ArrayList',
    'java.util.HashMap',
    'java.util.List',
    'java.util.Map'
  ],

  properties: [
    {
      name: 'serviceName',
      class: 'String',
      javaFactory: `
      return "medusaNodeDAO";
      `
    },
    {
      class: 'Object',
      name: 'assemblyLine',
      javaType: 'foam.util.concurrent.AssemblyLine',
      javaFactory: 'return new foam.util.concurrent.AsyncAssemblyLine(getX(), this.getClass().getSimpleName()+":"+getServiceName());'
    },
    {
      // TODO: clear on ClusterConfig DAO updates
      name: 'clients',
      class: 'Map',
      javaFactory: 'return new HashMap();'
    },
    {
      name: 'threadPoolName',
      class: 'String',
      value: 'medusaThreadPool'
    },
    {
      class: 'FObjectProperty',
      of: 'foam.nanos.logger.Logger',
      name: 'logger',
      visibility: 'HIDDEN',
      javaFactory: `
        return new PrefixLogger(new Object[] {
          this.getClass().getSimpleName(),
          this.getServiceName()
        }, (Logger) getX().get("logger"));
      `
    },
  ],

  methods: [
    {
      documentation: `
  - mod by node groups to get node bucket
  - create job for each client in bucket
`,
      name: 'put_',
      javaCode: `
      MedusaEntry entry = (MedusaEntry) obj;
      getLogger().debug("put", entry.getIndex());
      PM pm = createPM(x, "put");
      try {
        ClusterConfigSupport support = (ClusterConfigSupport) getX().get("clusterConfigSupport");
        ClusterConfig myConfig = support.getConfig(x, support.getConfigId());

        int groups = support.getNodeGroups();
        Map buckets = support.getNodeBuckets();
        int index = (int) (entry.getIndex() % groups);
        List bucket = (List) buckets.get(index);

        for ( int i = 0; i < bucket.size(); i++ ) {
          ClusterConfig config = (ClusterConfig) bucket.get(i);
          getAssemblyLine().enqueue(new foam.util.concurrent.AbstractAssembly() {
            public void executeJob() {
              try {
                DAO dao = (DAO) getClients().get(config.getId());
                if ( dao == null ) {
                  dao = (DAO) x.get(getServiceName());
                  if ( dao != null ) {
                    getLogger().debug("short circuit");
                  } else {
                    dao = support.getClientDAO(x, getServiceName(), myConfig, config);
                    dao = new RetryClientSinkDAO.Builder(x)
                            .setDelegate(dao)
                            .setMaxRetryAttempts(support.getMaxRetryAttempts())
                            .setMaxRetryDelay(support.getMaxRetryDelay())
                            .build();
                  }
                  getClients().put(config.getId(), dao);
                }

                getLogger().debug("put_", "job", entry.getIndex(), config.getName(), "data", (entry.getData() != null) ? entry.getData().getClass().getSimpleName():"null");
                dao.put_(x, entry);
              } catch ( Throwable t ) {
                getLogger().error(t);
              }
            }
          });
        }
        return obj;
      } finally {
        pm.log(x);
      }
      `
    },
    {
      name: 'createPM',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'name',
          type: 'String'
        }
      ],
      javaType: 'PM',
      javaCode: `
      return PM.create(x, this.getOwnClassInfo(), getServiceName()+":"+name);
      `
    },
  ]
});