/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

var classes = [
  'foam.core.Action',
  'foam.core.Axiom',
  'foam.core.Detachable',
  'foam.core.Serializable',
  'foam.core.ContextAware',
  'foam.core.Exception',
  'foam.core.ExceptionInterface',
  'foam.core.FOAMException',
  'foam.core.FOAMExceptionTest',
  'foam.core.FOAMExceptionTestTestException',
  'foam.core.Freezable',
  'foam.core.ContextAgent',
  'foam.core.CompoundContextAgency',
  'foam.core.Identifiable',
  'foam.core.Validatable',
  'foam.core.Agency',
  'foam.core.CoreTypesValidationTest',
  'foam.core.CoreTypesValidationTestModel',
  'foam.core.Validator',
  'foam.core.CompoundException',
  'foam.core.ValidationException',
  'foam.core.ClientRuntimeException',
  'foam.core.IntHolder',
  'foam.core.StringHolder',
  'foam.core.BooleanHolder',
  'foam.core.RequiredBooleanHolder',
  'foam.glang.EndOfTimeSpan',
  'foam.glang.EndOfDay',
  'foam.glang.EndOfWeek',
  'foam.glang.EndOfMonth',
  'foam.glang.EndOfQuarter',
  'foam.glang.EndOfYear',
  'foam.mlang.predicate.Predicate',
  'foam.mlang.predicate.True',
  'foam.mlang.predicate.False',
  'foam.mlang.predicate.And',
  'foam.mlang.predicate.Gt',
  'foam.mlang.predicate.Or',
  'foam.mlang.predicate.AbstractPredicate',
  'foam.mlang.predicate.Nary',
  'foam.mlang.predicate.NamedProperty',
  'foam.mlang.predicate.Unary',
  'foam.mlang.predicate.Binary',
  'foam.mlang.predicate.ArrayBinary',
  'foam.mlang.predicate.Contains',
  'foam.mlang.predicate.ContainsIC',
  'foam.mlang.predicate.StartsWith',
  'foam.mlang.predicate.StartsWithIC',
  'foam.mlang.predicate.Gt',
  'foam.mlang.predicate.Gte',
  'foam.mlang.predicate.Neq',
  'foam.mlang.predicate.Not',
  'foam.mlang.predicate.Lt',
  'foam.mlang.predicate.In',
  'foam.mlang.predicate.Lte',
  'foam.mlang.predicate.Has',
  'foam.mlang.predicate.Keyword',
  'foam.mlang.predicate.IsInstanceOf',
  'foam.mlang.predicate.IsClassOf',
  'foam.mlang.predicate.DotF',
  'foam.mlang.sink.Count',
  'foam.mlang.sink.GroupBy',
  'foam.mlang.F',
  'foam.mlang.StringLength',
  'foam.mlang.Expr',
  'foam.mlang.DOTMQLTest',
  'foam.mlang.IsValid',
  'foam.mlang.AbstractExpr',
  'foam.mlang.IdentityExpr',
  'foam.mlang.predicate.Eq',
  'foam.mlang.Constant',
  'foam.mlang.ArrayConstant',
  'foam.mlang.expr.Dot',
  'foam.mlang.expr.PropertyExpr',
  'foam.mlang.expr.Ref',
  'foam.mlang.expr.DateTypes',
  'foam.mlang.expr.DateGrouping',
  'foam.mlang.expr.DateGroupingExpr',
  'foam.mlang.Formula',
  'foam.mlang.expr.Add',
  'foam.mlang.expr.Subtract',
  'foam.mlang.expr.Multiply',
  'foam.mlang.expr.Divide',
  'foam.mlang.expr.MinFunc',
  'foam.mlang.expr.MaxFunc',
  'foam.mlang.PredicatedExpr',
  'foam.mlang.ContextObject',
  'foam.mlang.CurrentTime',
  'foam.mlang.expr.TimeOfDay',
  'foam.mlang.predicate.RegExp',
  'foam.mlang.predicate.OlderThan',
  'foam.mlang.predicate.isAuthorizedToRead',
  'foam.mlang.predicate.isAuthorizedToDelete',
  'foam.mlang.predicate.ContextUserPredicate',
  'foam.net.CIDR',
  'foam.net.IPSupport',
  'foam.net.Host',
  'foam.box.Box',
  'foam.box.Skeleton',
  'foam.box.AbstractSkeleton',
  'foam.box.ProxyBox',
  'foam.box.SubBox',
  'foam.box.Message',
  'foam.box.RegisterSelfMessage',
  'foam.box.SubBoxMessage',
  'foam.box.SubscribeMessage',
  'foam.box.NamedBox',
  'foam.box.HTTPAuthorizationType',
  'foam.box.HTTPBox',
  'foam.box.HTTPReplyBox',
  'foam.box.AuthServiceClientBox',
  'foam.box.ExportBox',
  'foam.nanos.iban.IBANInfo',
  'foam.nanos.iban.ValidationIBAN',
  'foam.nanos.iban.test.ValidationIBANTest',
  'foam.nanos.app.AppConfig',
  'foam.nanos.app.ContextLookupAppConfigService',
  'foam.nanos.http.WebAgent',
  'foam.demos.heroes.Hero',
  'com.google.auth.TokenVerifier',
  'foam.box.RemoteException',
  'foam.box.RPCMessage',
  'foam.box.RPCReturnBox',
  'foam.box.RPCReturnMessage',
  'foam.box.RPCErrorMessage',
  'foam.box.BoxRegistry',
  'foam.box.NoSuchNameException',
  'foam.box.ReplyBox',
  'foam.box.LocalBoxRegistry',
  'foam.box.BoxRegistryBox',
  'foam.box.RawWebSocketBox',
  'foam.box.ReturnBox',
  'foam.box.BoxService',
  'foam.box.SessionReplyBox',
  'foam.box.SessionClientBox',
  'foam.box.socket.BoxHolder',
  'foam.box.socket.SocketConnectionBox',
  'foam.box.socket.SocketConnectionBoxManager',
  'foam.box.socket.SocketConnectionReplyBox',
  'foam.box.socket.SocketClientBox',
  'foam.box.socket.SocketClientReplyBox',
  'foam.box.socket.SocketServer',
  'foam.box.socket.SslContextFactory',
 // 'foam.box.network.DemoSocketClientReplyBox',
  'foam.box.NullBox',
  'foam.dao.DAO',
  'foam.dao.SlowDAO',
  'foam.dao.DOP',
  'foam.dao.PredicatedDualDelegateDAO',
  'foam.dao.CSVSink',
  'foam.lib.csv.CSVOutputter',
  'foam.lib.csv.PrefixedCSVOutputter',
  'foam.lib.csv.CSVOutputterImpl',
  'foam.lib.csv.ProxyCSVOutputter',
  'foam.lib.csv.FromCSVSetter',
  'foam.dao.java.JDAO',
  'foam.dao.CopyFromDAO',
  'foam.dao.FilteredDAO',
  'foam.dao.JSONFormatParseDAO',
  'foam.dao.Journal',
  'foam.dao.RemoveChildrenOnRemoveDAO',
  'foam.dao.AbstractJournal',
  'foam.dao.ProxyJournal',
  'foam.dao.CompositeJournal',
  'foam.dao.AbstractF3FileJournal',
  'foam.dao.AbstractFileJournal',
  'foam.dao.F3FileJournal',
  'foam.dao.NullJournal',
  'foam.dao.ReadOnlyF3FileJournal',
  'foam.dao.FileJournal',
  'foam.dao.NullJournal',
  'foam.dao.ReadOnlyFileJournal',
  'foam.dao.ReadOnlyF3FileJournal',
  'foam.dao.RoutingJournal',
  'foam.dao.RoutingJournalTest',
  'foam.dao.RoutingJDAO',
  'foam.dao.JournalType',
  'foam.dao.WriteOnlyJDAO',
  'foam.dao.WriteOnlyFileJournal',
  'foam.dao.BaseNotificationClientDAO',
  'foam.dao.NotificationClientDAO',
  'foam.dao.WriteOnlyF3FileJournal',
  'foam.dao.BaseClientDAO',
  'foam.dao.ClientDAO',
  'foam.dao.ClientSink',
  'foam.dao.ResetSink',
  'foam.dao.DAOSink',
  'foam.dao.MergedResetSink',
  'foam.dao.Sink',
  'foam.dao.ArraySink',
  'foam.dao.DAOCopySink',
  'foam.dao.AbstractSink',
  'foam.mlang.sink.AbstractUnarySink',
  'foam.dao.PredicatedSink',
  'foam.dao.OrderedSink',
  'foam.dao.LimitedSink',
  'foam.dao.SkipSink',
  'foam.dao.DedupSink',
  'foam.dao.ReadOnlyDAO',
  'foam.dao.KeyValueDAO',
  'foam.dao.RelationshipDAO',
  'foam.dao.ManyToManyRelationship',
  'foam.dao.ManyToManyRelationshipImpl',
  'foam.dao.ManyToManyRelationshipDAO',
  'foam.dao.SQLStatement',
  'foam.dao.EasyDAO',
  'foam.dao.EnabledAwareDAO',
  'foam.dao.EnabledAwareDAOTest',
  'foam.dao.index.PersistedIndexTest',
  'foam.dao.SequenceNumberDAO',
  'foam.dao.SequenceNumberDAOTest',
  'foam.dao.PipelinePMDAO',
  'foam.dao.PMDAO',
  'foam.dao.PurgeRecordCmd',
  'foam.dao.UniqueConstraintException',
  'foam.dao.FUIDAO',
  'foam.nanos.pm.PMFactory',
  'foam.nanos.pm.PMInfo',
  'foam.nanos.pm.PMLogger',
  'foam.nanos.pm.NullPMLogger',
  'foam.dao.PutOnlyDAO',
  'foam.dao.ORBRequest',
  'foam.dao.ORBitalDAO',
  'foam.mlang.order.Comparator',
  'foam.mlang.order.Desc',
  'foam.mlang.order.ThenBy',
  'foam.mlang.sink.Count',
  'foam.mlang.sink.Max',
  'foam.mlang.sink.Min',
  'foam.mlang.sink.Projection',
  'foam.mlang.sink.Sum',
  'foam.mlang.sink.Average',
  'foam.mlang.sink.Map',
  'foam.nanos.alarming.AddAlarmNameDAO',
  'foam.nanos.alarming.Alarm',
  'foam.nanos.alarming.AlarmAndMonitoring',
  'foam.nanos.alarming.AlarmConfig',
  'foam.nanos.alarming.AlarmConfigOMNameDAO',
  'foam.nanos.alarming.AlarmConfigOMNameSink',
  'foam.nanos.alarming.AlarmHostnameRuleAction',
  'foam.nanos.alarming.AlarmIdRefines',
  'foam.nanos.alarming.Alarming',
  'foam.nanos.alarming.AlarmingUniqueNameDAO',
  'foam.nanos.alarming.AlarmLoggingDAO',
  'foam.nanos.alarming.AlarmNotificationDAO',
  'foam.nanos.alarming.AlarmReason',
  'foam.nanos.alarming.MonitoringReport',
  'foam.nanos.alarming.MonitorType',
  'foam.nanos.alarming.OMName',
  'foam.nanos.actioncommand.ActionCommand',
  'foam.nanos.NanoService',
  'foam.nanos.boot.NSpec',
  'foam.nanos.boot.NSpecAware',
  'foam.nanos.boot.DAONSpecMenu',
  'foam.nanos.app.Mode',
  'foam.nanos.bench.Benchmark',
  'foam.nanos.auth.AccessDeniedException',
  'foam.nanos.auth.AccountDisabledException',
  'foam.nanos.auth.AccountLockedException',
  'foam.nanos.auth.AgentJunctionStatus',
  'foam.nanos.auth.Authorizer',
  'foam.nanos.auth.AuthorizationDAO',
  'foam.nanos.auth.AuthenticationException',
  'foam.nanos.auth.AuthorizationException',
  'foam.nanos.auth.AssignableAware',
  'foam.nanos.auth.DuplicateEmailException',
  'foam.nanos.auth.DuplicateUserNameException',
  'foam.nanos.auth.EnabledAware',
  'foam.nanos.auth.EnabledAwareDummy',
  'foam.nanos.auth.GroupPermissionJunction',
  'foam.nanos.auth.GroupPermissionJunctionRefinement',
  'foam.nanos.auth.CheckPermissionsSink',
  'foam.nanos.auth.Group',
  'foam.nanos.auth.PasswordPolicy',
  'foam.nanos.auth.CreatedAware',
  'foam.nanos.auth.CreatedAwareDAO',
  'foam.nanos.auth.CreatedByAware',
  'foam.nanos.auth.CreatedByAwareDAO',
  'foam.nanos.auth.InvalidPasswordException',
  'foam.nanos.auth.LastModifiedAware',
  'foam.nanos.auth.LastModifiedAwareDAO',
  'foam.nanos.auth.LastModifiedByAware',
  'foam.nanos.auth.LastModifiedByAwareDAO',
  'foam.nanos.auth.LifecycleState',
  'foam.nanos.auth.LifecycleAware',
  'foam.nanos.auth.LifecycleAwareDAO',
  'foam.nanos.auth.LocaleSupport',
  'foam.nanos.auth.DeletedAwareDAO',
  'foam.nanos.auth.DeletedAwareDAOTest',
  'foam.nanos.auth.Permission',
  'foam.nanos.auth.DayOfWeek',
  'foam.nanos.auth.Hours',
  'foam.nanos.auth.Address',
  'foam.nanos.auth.Phone',
  'foam.nanos.auth.HumanNameTrait',
  'foam.nanos.auth.User',
  'foam.nanos.auth.Subject',
  'foam.nanos.auth.PriorPassword',
  'foam.nanos.auth.ruler.AddPasswordHistoryAction',
  'foam.nanos.auth.ruler.PreventDuplicateUsernameAction',
  'foam.nanos.auth.ruler.EnsurePropertyOnCreateRule',
  'foam.nanos.auth.test.PasswordPolicyTest',
  'foam.nanos.auth.Country',
  'foam.nanos.auth.PropertyType',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.UniqueUserService',
  'foam.nanos.auth.PMAuthService',
  'foam.nanos.auth.UserUserJunction',
  'foam.nanos.auth.ClientAuthService',
  'foam.nanos.auth.ClientLoginAuthService',
  'foam.nanos.auth.AgentAuthService',
  'foam.nanos.auth.AgentAuthClient',
  'foam.nanos.auth.ClientAgentAuthService',
  'foam.nanos.auth.HtmlDoc',
  'foam.nanos.auth.PasswordExpiryAuthService',
  'foam.nanos.auth.token.Token',
  'foam.nanos.auth.token.TokenService',
  'foam.nanos.auth.token.ClientTokenService',
  'foam.nanos.auth.token.AbstractTokenService',
  'foam.nanos.auth.token.TokenExpiredException',
  'foam.nanos.auth.token.TokenInvalidException',
  'foam.nanos.auth.email.EmailTokenService',
  'foam.nanos.auth.email.EmailDocService',
  'foam.nanos.auth.email.EmailDocInterface',
  'foam.nanos.auth.email.ClientEmailDocService',
  'foam.nanos.auth.resetPassword.ResetPasswordTokenService',
  'foam.nanos.auth.PermissionedPropertyDAO',
  'foam.nanos.auth.SystemAuthService',
  'foam.nanos.auth.HidePropertiesSink',
  'foam.nanos.auth.ServiceProvider',
  'foam.nanos.auth.ServiceProviderAware',
  'foam.nanos.auth.ServiceProviderAwareDAO',
  'foam.nanos.auth.ServiceProviderAwarePredicate',
  'foam.nanos.auth.ServiceProviderAwareSink',
  'foam.nanos.auth.ServiceProviderAwareSupport',
  'foam.nanos.auth.test.ServiceProviderAwareTest',
  'foam.nanos.auth.test.ServiceProviderAuthorizerTest',
  'foam.nanos.auth.test.DummySp',
  'foam.nanos.auth.test.UserAndGroupPermissionTest',
  'foam.nanos.auth.twofactor.OTPKey',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.auth.twofactor.AbstractOTPAuthService',
  'foam.nanos.auth.twofactor.AbstractTOTPAuthService',
  'foam.nanos.auth.twofactor.ClientOTPAuthService',
  'foam.nanos.auth.twofactor.GoogleTOTPAuthService',
  'foam.nanos.auth.twofactor.TwoFactorAuthService',
  'foam.nanos.auth.UserPropertyAvailabilityService',
  'foam.nanos.auth.ClientUserPropertyAvailabilityService',
  'foam.nanos.auth.LogoutDisabledUserDAO',
  'foam.nanos.auth.DeletedAware',
  'foam.nanos.auth.DeletedAwareDummy',
  'foam.nanos.auth.DeletedAwareDAOTest',
  'foam.nanos.auth.UserAndGroupAuthService',
  'foam.nanos.auth.EnabledCheckAuthService',
  'foam.nanos.auth.CommonPassword',
  'foam.nanos.auth.AddressConfig',
  'foam.nanos.auth.UserNotFoundException',
  'foam.nanos.auth.ResetSpidBeforeLoginAuthService',
  'foam.nanos.auth.PreventDuplicateEmailLoginService',
  'foam.nanos.http.HttpParameters',
  'foam.nanos.http.DefaultHttpParameters',
  'foam.nanos.http.SendErrorHandler',
  'foam.nanos.session.LocalSetting',
  'foam.nanos.session.LocalSettingSessionDAO',
  'foam.nanos.session.Session',
  'foam.nanos.session.SessionService',
  'foam.nanos.session.SimpleSessionService',
  'foam.nanos.pool.AbstractFixedThreadPool',
  'foam.nanos.pool.ThreadPoolAgency',
  'foam.nanos.om.OMLogger',
  'foam.nanos.pool.AbstractFixedThreadPool',
  'foam.nanos.pool.ThreadPoolAgency',
  'foam.nanos.jetty.JettyThreadPoolConfig',
  'foam.nanos.pm.NullPM',
  'foam.nanos.pm.PM',
  'foam.nanos.script.Language',
  'foam.nanos.auth.Language',
  'foam.nanos.auth.Region',
  'foam.nanos.auth.TimeZone',
  'foam.nanos.logger.LogMessage',
  'foam.nanos.logger.LogMessageDAO',
  'foam.nanos.logger.LogLevelFilterLogger',
  'foam.nanos.logger.AbstractLogger',
  'foam.nanos.logger.DAOLogger',
  'foam.nanos.logger.Logger',
  'foam.nanos.logger.LoggerUserInfo',
  'foam.nanos.logger.NotificationLogMessageDAO',
  'foam.nanos.logger.RepeatLogMessageDAO',
  'foam.nanos.logger.ProxyLogger',
  'foam.nanos.logger.LoggerJDAO',
  'foam.nanos.logger.LoggerJournal',
  'foam.nanos.logger.LoggingDAO',
  'foam.nanos.logger.StdoutLoggerDAO',
  'foam.nanos.logger.benchmark.LoggerBenchmark',
  'foam.nanos.menu.XRegistration',
  'foam.nanos.menu.Menu',
  'foam.nanos.menu.DAOMenu',
  //'foam.nanos.menu.DAOMenu2',
  'foam.nanos.menu.DocumentMenu',
  'foam.nanos.menu.DocumentFileMenu',
  'foam.nanos.menu.LinkMenu',
  'foam.nanos.menu.ListMenu',
  'foam.nanos.menu.MenuBar',
  'foam.nanos.menu.PopupMenu',
  'foam.nanos.menu.SubMenu',
  'foam.nanos.menu.SubMenuView',
  'foam.nanos.menu.TabsMenu',
  'foam.nanos.menu.ViewMenu',
  'foam.nanos.medusa.AccessMode',
  'foam.nanos.medusa.ClientElectoralService',
  'foam.nanos.medusa.Clusterable',
  'foam.nanos.medusa.ClusterClientDAO',
  'foam.nanos.medusa.ClusterCommand',
  'foam.nanos.medusa.ClusterCommandHop',
  'foam.nanos.medusa.ClusterConfig',
  'foam.nanos.medusa.ClusterConfigMonitor',
  'foam.nanos.medusa.ClusterConfigMonitorAgent',
  'foam.nanos.medusa.ClusterConfigNARegionReplayDAO',
  'foam.nanos.medusa.ClusterConfigReplayDAO',
  'foam.nanos.medusa.ClusterConfigReplayingInfoDAO',
  'foam.nanos.medusa.ClusterConfigStatusDAO',
  'foam.nanos.medusa.ClusterConfigSupport',
  'foam.nanos.medusa.ClusterConfigSupportDAO',
  'foam.nanos.medusa.ClusterException',
  'foam.nanos.medusa.ClusterServerDAO',
  'foam.nanos.medusa.DaggerException',
  'foam.nanos.medusa.DaggerService',
  'foam.nanos.medusa.DaggerLink',
  'foam.nanos.medusa.DaggerLinks',
  'foam.nanos.medusa.DefaultDaggerService',
  'foam.nanos.medusa.ElectoralService',
  'foam.nanos.medusa.ElectoralServiceState',
  'foam.nanos.medusa.ElectoralServiceServer',
  'foam.nanos.medusa.MedusaEntry',
  'foam.nanos.medusa.MedusaException',
  'foam.nanos.medusa.MedusaAdapterDAO',
  'foam.nanos.medusa.MedusaBroadcastDAO',
  'foam.nanos.medusa.MedusaBroadcastNARegionDAO',
  'foam.nanos.medusa.MedusaBroadcastNARegionNodesDAO',
  'foam.nanos.medusa.MedusaBroadcast2NodesDAO',
  'foam.nanos.medusa.MedusaConsensusDAO',
  'foam.nanos.medusa.MedusaHashingDAO',
  'foam.nanos.medusa.MedusaInternalDAO',
  'foam.nanos.medusa.MedusaNodeJDAO',
  'foam.nanos.medusa.MedusaNOPRegistryService',
  'foam.nanos.medusa.MedusaRegistry',
  'foam.nanos.medusa.MedusaRegistryService',
  'foam.nanos.medusa.MedusaSigningDAO',
  'foam.nanos.medusa.MedusaSetNodeDAO',
  'foam.nanos.medusa.MedusaStatusWatcher',
  'foam.nanos.medusa.MedusaTestingDAO',
  'foam.nanos.medusa.MedusaType',
  'foam.nanos.medusa.MedusaUniqueDAO',
  'foam.nanos.medusa.PrimaryNotFoundException',
  'foam.nanos.medusa.PromotedPurgeAgent',
  'foam.nanos.medusa.PurgeSink',
  'foam.nanos.medusa.RegionStatus',
  'foam.nanos.medusa.ReplayCmd',
  'foam.nanos.medusa.ReplayCompleteCmd',
  'foam.nanos.medusa.ReplayDetailsCmd',
  'foam.nanos.medusa.ReplayMediatorDAO',
  'foam.nanos.medusa.ReplayNodeDAO',
  'foam.nanos.medusa.ReplayRequestCmd',
  'foam.nanos.medusa.ReplayingDAO',
  'foam.nanos.medusa.ReplayingInfo',
  'foam.nanos.medusa.ReplayingInfoDAO',
  'foam.nanos.medusa.RetryClientSinkDAO',
  'foam.nanos.medusa.Status',
  'foam.nanos.medusa.MedusaMessage',
  'foam.nanos.medusa.benchmark.DaggerLinkBenchmark',
  'foam.nanos.medusa.benchmark.DaggerVerifyBenchmark',
  'foam.nanos.medusa.benchmark.MedusaBenchmark',
  'foam.nanos.medusa.test.MedusaTestObject',
  'foam.nanos.benchmark.UUIDBenchmark',

  'foam.box.BackoffBox',

  'foam.comics.v2.EnabledActionsAuth',
  'foam.comics.v2.BasicEnabledActionsAuth',
  'foam.comics.v2.CRUDEnabledActionsAuth',
  'foam.comics.v2.CannedQuery',
  'foam.comics.v2.namedViews.NamedViewCollection',
  'foam.comics.v2.namedViews.NamedViewInstance',
  'foam.comics.v2.userfeedback.UserFeedbackAware',
  'foam.comics.v2.userfeedback.UserFeedbackStatus',
  'foam.comics.v2.userfeedback.UserFeedback',
  'foam.comics.v2.userfeedback.UserFeedbackException',
  'foam.nanos.menu.ScriptMenu',
  // Email base model or interface
  'foam.nanos.notification.email.EmailMessage',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.email.EmailTemplate',
  'foam.nanos.notification.email.EmailPropertyService',
  'foam.nanos.notification.email.Status',
  'foam.nanos.notification.email.EmailTemplateEngine',
  // Email service Files
  'foam.nanos.notification.email.SMTPConfig',
  'foam.nanos.notification.email.SMTPEmailService',
  'foam.nanos.notification.email.NullEmailService',
  'foam.nanos.notification.email.ProxyEmailService',
  // Property set on Emails
  'foam.nanos.notification.email.ChainedPropertyService',
  'foam.nanos.notification.email.EmailTemplateApplyEmailPropertyService',
  'foam.nanos.notification.email.GroupEmailTemplateService',
  'foam.nanos.notification.email.EmailConfig',
  'foam.nanos.notification.email.EmailConfigEmailPropertyService',
  'foam.nanos.notification.email.EmailMessageValidationPropertyService',
  // EmailMessageDAO(service) decorator
  'foam.nanos.notification.email.EmailServiceDAO',

  'foam.nanos.notification.email.POP3Email',
  'foam.nanos.notification.email.ClientPOP3EmailService',
  'foam.nanos.notification.push.PushService',
  'foam.nanos.notification.push.FirebasePushService',

  // SMS models, services and interfaces
  'foam.nanos.notification.sms.NullSMSService',
  'foam.nanos.notification.sms.ProxySMSService',
  'foam.nanos.notification.sms.SMSMessage',
  'foam.nanos.notification.sms.SMSService',
  'foam.nanos.notification.sms.SMSSetting',
  'foam.nanos.notification.sms.SMSStatus',
  'foam.nanos.notification.sms.TwilioConfig',
  'foam.nanos.notification.sms.TwilioSMSService',

  'foam.nanos.notification.Notifiable',
  'foam.nanos.notification.Notification',
  'foam.nanos.notification.MyNotificationDAO',
  'foam.nanos.notification.NotificationExpansionDAO',
  'foam.nanos.notification.NotificationTemplateDAO',
  'foam.nanos.notification.ScriptRunNotification',
  'foam.nanos.notification.EmailSetting',
  'foam.nanos.notification.NotificationSetting',
  'foam.nanos.notification.NotificationHostnameRuleAction',
  'foam.nanos.notification.ScriptRunNotification',
  'foam.nanos.notification.SlackSetting',
  'foam.nanos.notification.ToastNotificationDAO',
  'foam.nanos.notification.ToastState',
  'foam.nanos.notification.ResendNotificationServiceInterface',
  'foam.nanos.notification.ClientResendNotificationService',
  'foam.nanos.script.Script',
  'foam.nanos.script.ScriptEvent',
  'foam.nanos.script.TestRunnerConfig',
  'foam.nanos.script.TestRunnerScript',
  'foam.nanos.test.Test',
  'foam.nanos.column.ExpressionForArrayOfNestedPropertiesBuilder',
  'foam.nanos.column.ColumnConfigToPropertyConverter',
  'foam.nanos.column.ColumnPropertyValue',
  'foam.nanos.column.NestedPropertiesExpression',
  'foam.nanos.column.TableColumnOutputter',
  'foam.nanos.cron.Cron',
  'foam.nanos.cron.TimeHMS',
  'foam.nanos.cron.Schedule',
  'foam.nanos.cron.OrSchedule',
  'foam.nanos.cron.CronSchedule',
  'foam.nanos.cron.CronScheduler',
  'foam.nanos.cron.CronScheduleDAO',
  'foam.nanos.cron.IntervalSchedule',
  'foam.nanos.cron.TimeOfDaySchedule',
  'foam.nanos.cron.test.IntervalScheduleTest',
  'foam.nanos.cron.test.TimeOfDayScheduleTest',
  'foam.dao.history.PropertyUpdate',
  'foam.dao.history.HistoryRecord',
  'foam.dao.FixedSizeDAO',
  'foam.nanos.export.ClientGoogleSheetsExportService',
  'foam.nanos.export.ExportDriverRegistry',
  'foam.nanos.export.GoogleSheetsBasedExportDriver',
  'foam.nanos.export.GoogleSheetsExport',
  'foam.nanos.export.GoogleSheetsBasedExportDriver',
  'foam.nanos.export.GoogleSheetsServiceConfig',
  'foam.nanos.export.GoogleSheetsPropertyMetadata',
  'foam.nanos.export.GoogleSheetsExportDriver',
  'foam.nanos.export.PDFGoogleSheetsExportDriver',
  'foam.nanos.export.report.Template',
  'foam.nanos.google.api.auth.GoogleApiAuthService',
  'foam.nanos.google.api.auth.GoogleApiCredentials',
  'foam.nanos.google.api.drive.GoogleDriveService',
  'foam.nanos.google.api.sheets.ColumnHeaderToPropertyMapping',
  'foam.nanos.google.api.sheets.GoogleSheetsApiService',
  'foam.nanos.google.api.sheets.GoogleSheetsDataImportService',
  'foam.nanos.google.api.sheets.GoogleSheetsDataImportServiceImpl',
  'foam.nanos.google.api.sheets.GoogleSheetsImportConfig',
  'foam.nanos.google.api.sheets.GoogleSheetsTransactionsDataImportServiceImpl',
  'foam.nanos.google.api.sheets.ImportDataMessage',
  'foam.dao.jdbc.ConnectionPool',
  'foam.lib.Outputter',
  'foam.lib.PropertyPredicate',
  'foam.lib.PermissionedPropertyPredicate',
  'foam.lib.NetworkPropertyPredicate',
  'foam.lib.ExternalPropertyPredicate',
  'foam.lib.StorageOptionalPropertyPredicate',
  'foam.lib.StoragePropertyPredicate',
  'foam.lib.StorageTransientPropertyPredicate',
  'foam.lib.ClusterPropertyPredicate',
  'foam.lib.AndPropertyPredicate',
  'foam.lib.parse.Parser',
  'foam.lib.parse.PStream',
  'foam.lib.parse.BlobPStream',
  'foam.lib.parse.SymbolParser',
  'foam.lib.parse.Grammar',
  'foam.lib.parse.Action',
  'foam.lib.parse.ActionParser',
  'foam.lib.json.JSONParser',
  'foam.lib.json.OutputJSON',
  'foam.lib.json.OutputterMode',
  'foam.lib.json.UnknownFObject',
  'foam.lib.json.UnknownFObjectArray',
  'foam.lib.json.ClassReferenceParserTest',
  'foam.lib.json.PropertyReferenceParserTest',
  'foam.lib.xml.OutputXML',
  'foam.blob.Blob',
  'foam.blob.BlobService',
  'foam.blob.AbstractBlob',
  'foam.blob.AbstractBlobService',
  'foam.blob.SubBlob',
  'foam.blob.IdentifiedBlob',
  'foam.blob.BlobStore',

  'foam.nanos.geocode.GoogleMapsAddressComponent',
  'foam.nanos.geocode.GoogleMapsCoordinates',
  'foam.nanos.geocode.GoogleMapsGeocodeResponse',
  'foam.nanos.geocode.GoogleMapsGeocodeResult',
  'foam.nanos.geocode.GoogleMapsGeometry',
  'foam.nanos.geocode.GoogleMapsBoundary',
  'foam.nanos.geocode.GoogleMapsAddressParser',
  'foam.nanos.geocode.GoogleMapsPlacesPredictions',
  'foam.nanos.geocode.GoogleMapsPlacesResponse',
  'foam.nanos.geocode.GoogleMapsCredentials',

  'foam.nanos.demo.DemoObject',
  'foam.nanos.demo.relationship.Student',
  'foam.nanos.demo.relationship.Professor',
  'foam.nanos.demo.relationship.Course',
  'foam.nanos.demo.relationship.CourseType',
  'foam.nanos.demo.relationship.StudentCourseJunction',
  'foam.nanos.fs.File',
  'foam.nanos.fs.FileDataClearSink',
  'foam.nanos.fs.FileDataDAO',
  'foam.nanos.fs.FileLabel',
  'foam.nanos.fs.FileLabelFilterDAO',
  'foam.nanos.fs.FileType',
  'foam.crypto.hash.Hasher',
  'foam.crypto.hash.HashableTest',

  'foam.crypto.sign.Signer',
  'foam.crypto.sign.SignableTest',

  'foam.nanos.http.Command',
  'foam.nanos.http.Format',
  'foam.nanos.http.DefaultHttpParameters',
  'foam.nanos.http.HttpParameters',
  'foam.nanos.dig.DIG',
  'foam.nanos.dig.SUGAR',
  'foam.nanos.dig.DUGDigestConfig',
  'foam.nanos.dig.DUGRule',
  'foam.nanos.dig.DUGRuleAction',

  'foam.nanos.jetty.HttpServer',
  'foam.nanos.servlet.Servlet',
  'foam.nanos.servlet.ServletMapping',
  'foam.nanos.servlet.ErrorPageMapping',
  'foam.nanos.servlet.FilterMapping',
  'foam.nanos.servlet.VirtualHostRoutingServlet',

  'foam.lib.query.TestModel',
  'foam.lib.query.FooEnum',

  'foam.parse.QueryParserUserTest',
  'foam.parse.PSymbol',
  'foam.lib.parse.Grammar',
  'foam.lib.parse.Action',
  'foam.lib.parse.ActionParser',
  'foam.lib.parse.SymbolParser',
  'foam.util.UIDGenerator',
  'foam.util.EmailTest',
  'foam.util.PasswordTest',
  'foam.util.SecurityUtilTest',
  'foam.test.TestObj',
  'foam.core.FObjectTest',

  'foam.nanos.dig.drivers.DigFormatDriver',
  'foam.nanos.dig.drivers.DigCsvDriver',
  'foam.nanos.dig.drivers.DigHtmlDriver',
  'foam.nanos.dig.drivers.DigJsonDriver',
  'foam.nanos.dig.drivers.DigJsonJDriver',
  'foam.nanos.dig.drivers.DigXmlDriver',
  'foam.nanos.dig.exception.DigErrorMessage',
  'foam.nanos.dig.exception.DAONotFoundException',
  'foam.nanos.dig.exception.DAORequiredException',
  'foam.nanos.dig.exception.ParsingErrorException',
  'foam.nanos.dig.exception.DAOPutException',
  'foam.nanos.dig.exception.EmptyDataException',
  'foam.nanos.dig.exception.UnsupportException',
  'foam.nanos.dig.exception.UnknownIdException',
  'foam.nanos.dig.exception.DigSuccessMessage',

  'foam.nanos.dao.Operation',

  'foam.flow.Document',
  'foam.flow.DocumentationFolderDAO',
  'foam.flow.DocumentMenu',

  'foam.nanos.ruler.RuleGroup',
  'foam.nanos.ruler.FindRuledCommand',
  'foam.nanos.ruler.Ruled',
  'foam.nanos.ruler.Rule',
  'foam.nanos.ruler.RuledDAO',
  'foam.nanos.ruler.RulerData',
  'foam.nanos.ruler.test.RuledDAOTest',
  'foam.nanos.ruler.test.RuledDummy',
  'foam.nanos.ruler.RulerDAO',
  'foam.nanos.ruler.RulerProbe',
  'foam.nanos.ruler.TestedRule',
  'foam.nanos.ruler.RuleAction',
  'foam.nanos.ruler.CompositeRuleAction',
  'foam.nanos.ruler.StopRulerAction',
  'foam.nanos.ruler.ScriptPredicate',
  'foam.nanos.ruler.RuleHistory',
  'foam.nanos.ruler.RuleHistoryStatus',
  'foam.nanos.ruler.UpdateRulesListSink',
  'foam.nanos.ruler.predicate.PropertyChangePredicate',
  'foam.nanos.ruler.action.SendNotification',
  'foam.nanos.ruler.predicate.PropertyHasValue',
  'foam.nanos.ruler.predicate.PropertyEQValue',
  'foam.nanos.ruler.predicate.PropertyNEQValue',
  'foam.nanos.ruler.predicate.PropertyEQProperty',
  'foam.nanos.ruler.predicate.NewEqOld',
  'foam.nanos.ruler.predicate.IsInstancePredicate',
  'foam.nanos.ruler.predicate.IsClassPredicate',
  'foam.nanos.ruler.predicate.PropertyIsInstance',
  'foam.nanos.ruler.predicate.PropertyIsClass',
  'foam.nanos.ruler.predicate.ContextContainsPredicate',
  'foam.nanos.ruler.predicate.PropertyIsSetPredicate',
  'foam.nanos.ruler.action.ChangePropertyAction',
  'foam.nanos.ruler.action.AbstractCheckDAOforMatching',
  'foam.comics.SearchMode',

  // DAO decorators
  'foam.nanos.actioncommand.ActionCommandDAO',
  'foam.nanos.approval.ApprovalDAO',
  'foam.nanos.approval.PopulateApprovalRequestSummariesDAO',
  'foam.nanos.approval.RestrictedApprovableDAO',
  'foam.nanos.approval.SendGroupRequestApprovalDAO',
  'foam.nanos.audit.AuditDAO',
  'foam.nanos.auth.email.EmailVerificationDAO',
  'foam.nanos.auth.email.EmailVerificationWebAgent',
  'foam.dao.FreezingDAO',
  'foam.nanos.geocode.GoogleMapsGeocodingDAO',
  'foam.dao.history.HistoryDAO',
  'foam.nanos.script.ScriptRunnerDAO',
  'foam.dao.UnreliableDAO',
  'foam.nanos.auth.UserPasswordHashingDAO',
  'foam.dao.ValidatingDAO',

  // Support Files
  'foam.support.model.TicketMessage',
  'foam.support.model.SupportEmail',
  'foam.support.model.Ticket',

  'foam.nanos.dig.exception.ExternalAPIException',
  'foam.nanos.dig.exception.EmptyParameterException',
  'foam.nanos.dig.exception.GeneralException',
  'foam.nanos.dig.exception.TemporaryExternalAPIException',

  'foam.nanos.app.SupportConfig',

  'foam.nanos.test.StockSnapshot',
  'foam.nanos.analytics.FoldManagerDAODecorator',
  'foam.nanos.analytics.DAOFoldManager',
  'foam.nanos.analytics.DAOReduceManager',

  // Ticket
  'foam.nanos.ticket.TicketStatus',
  'foam.nanos.ticket.TicketComment',
  'foam.nanos.ticket.Ticket',
  'foam.nanos.ticket.TicketAddCommentDAO',
  'foam.nanos.ticket.TicketOwnerDAO',
  'foam.nanos.ticket.TicketCommentOwnerDAO',

  // Testing support
  'foam.test.TestEnum',
  'foam.test.AllSerializableProperties',
  'foam.nanos.test.EchoService',
  'foam.nanos.test.SerializationTestEchoService',

  // Ace Editor
  'io.c9.ace.Config',
  'io.c9.ace.Editor',
  'io.c9.ace.KeyBinding',
  'io.c9.ace.Mode',
  'io.c9.ace.Theme',

  // Themes
  'foam.nanos.theme.Theme',
  'foam.nanos.theme.ThemeDomain',
  'foam.nanos.theme.ThemeDomainsDAO',
  'foam.nanos.theme.Themes',

  //SQL JBDC Support
  'foam.dao.jdbc.JDBCConnectionSpec',
  'foam.dao.jdbc.TestDataForJDBC',
  'foam.dao.jdbc.TestCompany',
  'foam.dao.jdbc.TestEmployee',

  // Crunch
  'foam.nanos.crunch.crunchtest.FakeTestObject',
  'foam.nanos.crunch.crunchtest.TestCapable',
  //models
  'foam.nanos.crunch.Renewable',
  'foam.nanos.crunch.CapabilityGrantMode',
  'foam.nanos.crunch.Capability',
  'foam.nanos.crunch.CapabilityIntercept',
  'foam.nanos.crunch.MinMaxCapability',
  'foam.nanos.crunch.MinMaxCapabilityData',
  'foam.nanos.crunch.CapabilityJunctionPayload',
  'foam.nanos.crunch.lite.Capable',
  'foam.nanos.crunch.lite.CapableDAO',
  'foam.nanos.crunch.lite.CapableAdapterDAO',
  'foam.nanos.crunch.lite.CapablePayloadStatusDAO',
  'foam.nanos.crunch.lite.CapableCompatibleCapability',
  'foam.nanos.crunch.CapabilityAvailabilityDAO',

  'foam.nanos.crunch.lite.ruler.CapableCreateApprovalsRuleAction',
  'foam.nanos.crunch.lite.ruler.ReputDependantPayloads',
  'foam.nanos.crunch.lite.ruler.SetCapablePayloadStatusOnPut',
  'foam.nanos.crunch.lite.ruler.CapablePayloadApprovableRuleAction',
  'foam.nanos.crunch.lite.ruler.CapableStatusChangeAdjustApprovalsRuleAction',
  'foam.nanos.crunch.lite.ruler.UCJApprovableValidateAction',

  'foam.nanos.crunch.CapabilityCategory',
  'foam.nanos.crunch.CapabilityCategoryCapabilityJunction',
  'foam.nanos.crunch.CapabilityJunctionStatus',
  'foam.nanos.crunch.UserCapabilityJunction',
  'foam.nanos.crunch.ui.WizardState',
  // 'foam.nanos.crunch.ui.UserCapabilityWizardState',
  'foam.nanos.crunch.ui.CapabilityWizardlet',
  'foam.nanos.crunch.ui.ReviewCapabilityWizardlet',
  'foam.nanos.crunch.ui.MinMaxCapabilityWizardlet',
  'foam.nanos.crunch.ui.PrerequisiteAwareWizardlet',
  'foam.nanos.crunch.AgentCapabilityJunction',
  'foam.nanos.crunch.CapabilityCapabilityJunction',
  'foam.nanos.crunch.AssociatedEntity',
  'foam.nanos.crunch.RenewableData',
  'foam.nanos.crunch.UCJUpdateApprovable',

  'foam.nanos.crunch.connection.CapabilityPayload',
  'foam.nanos.crunch.connection.GrantPathNode',

  //daos
  'foam.nanos.crunch.connection.CapabilityPayloadDAO',
  'foam.nanos.crunch.UserCapabilityJunctionDAO',
  'foam.nanos.crunch.PredicatedPrerequisiteCapabilityJunctionDAO',
  //rules
  'foam.nanos.crunch.SendNotificationOnTopLevelCapabilityStatusUpdate',
  'foam.nanos.crunch.IsUserCapabilityJunctionStatusUpdate',
  'foam.nanos.crunch.RemoveJunctionsOnUserRemoval',
  'foam.nanos.crunch.CrunchService',
  'foam.nanos.crunch.ReputDependentUCJs',

  //u2 additions
  'foam.u2.crunch.FlatteningCapabilityWizardlet',

  // spid
  'foam.nanos.auth.CreateUserCapabilityJunctionOnSpidSet',
  'foam.nanos.auth.SetUserServiceProviderJunctionRuleAction',
  'foam.nanos.auth.FilterBySpidService',

  //ucjdao rules
  'foam.nanos.crunch.ruler.AuthorizeUCJStatusOnPut',
  'foam.nanos.crunch.ruler.CheckUCJOwnershipOnPut',
  'foam.nanos.crunch.ruler.ValidateUCJDataOnPut',
  'foam.nanos.crunch.ruler.SetUCJStatusOnPut',
  'foam.nanos.crunch.ruler.ConfigureUCJExpiryOnGranted',
  'foam.nanos.crunch.ruler.SaveUCJDataOnGranted',

  //crunch extras
  'foam.nanos.crunch.extra.ReviewCapability',
  'foam.nanos.crunch.extra.ReviewCapabilityData',
  'foam.nanos.crunch.extra.ReviewWizard',
  'foam.nanos.crunch.extra.ImplyReviewedAction',

  //crunch predicates
  'foam.nanos.crunch.predicate.CapabilityIsStatus',
  'foam.nanos.crunch.predicate.CapabilityPrerequisitesGranted',
  'foam.nanos.crunch.predicate.StatusChangedTo',
  'foam.nanos.crunch.predicate.IsAgent',
  'foam.nanos.crunch.predicate.CapabilityJunctionTransitionToStatus',
  'foam.nanos.crunch.predicate.IsAgentUpdate',

  'foam.nanos.crunch.document.Document',

  //authservice
  'foam.nanos.auth.CapabilityAuthService',
  // userQueryService
  'foam.nanos.auth.UserQueryService',
  'foam.nanos.auth.SimpleUserQueryService',
  //Unit
  'foam.core.Unit',
  'foam.core.Currency',
  // Strategy
  'foam.strategy.StrategyReference',
  'foam.strategy.StrategizerService',
  'foam.strategy.BasicStrategizer',
  'foam.strategy.ClientStrategizerService',

  //concurrent
  'foam.util.concurrent.AbstractAssembly',
  'foam.util.concurrent.Assembly',

  // approval
  'foam.nanos.approval.ApprovalRequest',
  'foam.nanos.approval.ApprovalRequestNotification',
  'foam.nanos.approval.ApprovalStatus',
  'foam.nanos.approval.Approvable',
  'foam.nanos.approval.ApprovableAwareDAO',
  'foam.nanos.approval.ApprovableAware',
  'foam.nanos.approval.ApprovableApprovalRequestsPredicate',
  'foam.nanos.approval.ApprovableApprovalRequestsRule',
  'foam.nanos.approval.FulfilledApprovablePredicate',
  'foam.nanos.approval.FulfilledNestedJournalApprovablePredicate',
  'foam.nanos.approval.FulfilledApprovableRule',
  'foam.nanos.approval.ApprovalDAO',
  'foam.nanos.approval.AuthenticatedApprovalDAOAuthorizer',
  'foam.nanos.approval.PopulateApprovalRequestsDAO',
  'foam.nanos.approval.ApprovalRequestAssignedToRule',
  'foam.nanos.approval.ApprovalRequestMemoRule',
  'foam.nanos.approval.ApprovalRequestClassificationEnum',
  'foam.nanos.approval.CompositeApprovable',
  'foam.nanos.approval.FulfilledCompositeApprovableRule',
  'foam.nanos.approval.UCJApprovable',


  'foam.core.NumberSet',

  // template
  'foam.java.ParseTemplateTest',
  'foam.java.ParseTemplateTestModel',

  // Translation Support
  'foam.i18n.XLIFFTranslationValue',
  'foam.i18n.Locale',
  'foam.i18n.TranslationService',
  'foam.i18n.ProxyTranslationService',
  'foam.i18n.LocaleTranslationService',

  // Notification
  'foam.nanos.crunch.TopLevelCapabilityStatusUpdateNotification',

  'foam.counter.Counter'
];

var abstractClasses = [
  'foam.nanos.menu.AbstractMenu',
//  'foam.json.Outputter'
];


var skeletons = [
  'foam.dao.DAO',
  'foam.nanos.app.AppConfigService',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.AgentAuthService',
  'foam.nanos.auth.UniqueUserService',
  'foam.nanos.auth.email.EmailDocInterface',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.auth.token.TokenService',
  'foam.nanos.auth.UserPropertyAvailabilityServiceInterface',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.email.POP3Email',
  'foam.nanos.notification.push.PushService',
  'foam.nanos.notification.ResendNotificationServiceInterface',
  'foam.nanos.session.SessionService',
  'foam.nanos.test.EchoService',
  'foam.strategy.StrategizerService',
  'foam.nanos.auth.UserQueryService',
  'foam.nanos.medusa.ElectoralService',
  'foam.nanos.export.GoogleSheetsExport',
  'foam.nanos.google.api.sheets.GoogleSheetsDataImportService',
  'foam.nanos.crunch.CrunchService',
  'foam.i18n.TranslationService'
];

var proxies = [
  'foam.dao.DAO',
  'foam.dao.Sink',
  'foam.lib.Outputter',
  'foam.lib.parse.Parser',
  'foam.lib.parse.PStream',
  'foam.blob.Blob',
  'foam.blob.BlobService',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.auth.UserPropertyAvailabilityServiceInterface',
  'foam.nanos.auth.UniqueUserService',
  'foam.nanos.http.WebAgent',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.push.PushService',
  'foam.strategy.StrategizerService',
  'foam.i18n.TranslationService'
];

var blacklist = [
  'foam.core.Property',
  'foam.mlang.predicate.Func',
  'foam.nanos.controller.Memento',
  'foam.u2.AttrSlot',
  'foam.u2.RenderSink',
  'foam.u2.ViewSpec'
];

module.exports = {
    classes: classes,
    abstractClasses: abstractClasses,
    skeletons: skeletons,
    proxies: proxies,
    blacklist: blacklist
};
