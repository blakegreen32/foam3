/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.box;

import foam.core.X;
import foam.dao.DAO;
import foam.nanos.app.AppConfig;
import foam.nanos.app.Mode;
import foam.nanos.auth.AuthenticationException;
import foam.nanos.auth.AuthorizationException;
import foam.nanos.auth.Group;
import foam.nanos.auth.User;
import foam.nanos.boot.Boot;
import foam.nanos.boot.NSpec;
import foam.nanos.logger.Logger;
import foam.nanos.logger.PrefixLogger;
import foam.nanos.session.Session;
import foam.util.SafetyUtil;
import org.eclipse.jetty.server.Request;

import java.util.StringTokenizer;
import javax.servlet.http.HttpServletRequest;

/**
 * This Box decorator adds session support to boxes.
 *
 * Its core purpose is to create a new context using parts of the context it was
 * created with and parts of a user's session context to pass on to its delegate
 * box. This class also enforces authorization and authentication controls for
 * the NSpec in the context.
 */
public class SessionServerBox
  extends ProxyBox
{
  protected boolean authenticate_;

  public SessionServerBox(X x, Box delegate, boolean authenticate) {
    super(x, delegate);
    authenticate_ = authenticate;
  }

  public void send(Message msg) {
    Logger logger = (Logger) getX().get("logger");
    NSpec spec = getX().get(NSpec.class);
    String sessionID = null;

    try {
      HttpServletRequest req = getX().get(HttpServletRequest.class);
      if ( req != null ) {
        String authorization = req.getHeader("Authorization");
        if ( ! SafetyUtil.isEmpty(authorization) ) {
          StringTokenizer st = new StringTokenizer(authorization);
          if ( st.hasMoreTokens() ) {
            String authType = st.nextToken();
            if ( HTTPAuthorizationType.BEARER.getName().equalsIgnoreCase(authType) ) {
              if ( st.hasMoreTokens() ) {
                sessionID = st.nextToken();
                if ( sessionID != null ) {
                  // test and use non-clustered medusa sessions
                  DAO sessionDAO = (DAO) getX().get("internalSessionDAO");
                  if ( sessionDAO != null ) {
                    Session session = (Session) sessionDAO.find(sessionID);
                    if ( session != null ) {
                      logger.debug("Using internalSessionDAO");
                      session.setClusterable(false);
                    }
                  }
                }
              } else {
                logger.warning(this.getClass().getSimpleName(), "send", "Authorization: "+authType+" token not found.");
                msg.replyWithException(new IllegalArgumentException("Authorization: "+authType+ " token not found."));
                return;
              }
            } else {
              logger.warning(this.getClass().getSimpleName(), "send", "Authorization: "+authType+" not supported.");
              msg.replyWithException(new IllegalArgumentException("Authorization: "+authType+ " not supported."));
              return;
            }
            if ( SafetyUtil.isEmpty(sessionID) ) {
              logger.warning(this.getClass().getSimpleName(), "send", "Authorization: Bearer token not found.");
              msg.replyWithException(new IllegalArgumentException("Authorization: Bearer token not found"));
              return;
            }
          }
        }
      }

      if ( sessionID == null ) {
        sessionID = (String) msg.getAttributes().get("sessionId");

      }

      if ( sessionID == null && authenticate_ ) {
        msg.replyWithException(new IllegalArgumentException("sessionid required for authenticated services"));
        return;
      }

      DAO sessionDAO = (DAO) getX().get("localSessionDAO");
      Session session = sessionID == null ? null : (Session) sessionDAO.find(sessionID);

      if ( session == null ) {
        session = new Session((X) getX().get(Boot.ROOT));
        session.setId(sessionID == null ? "anonymous" : sessionID);
        if ( req != null ) {
          session.setRemoteHost(req.getRemoteHost());
        }

        session = (Session) sessionDAO.put(session);
      } else if ( req != null ) {
        // if req == null it means that we're being accessed via webSockets
        if ( ! session.validRemoteHost(req.getRemoteHost()) ) {
          // If an existing session is reused with a different remote host then
          // delete the session and force a re-login.
          // This is done as a security measure to reduce the likelihood of
          // session hijacking. If an attacker were to get ahold of another
          // user's session id, they could start using that session id in the
          // requests they send to the server and gain access to the real user's
          // session and therefore their privileges and data. By forcing users
          // to sign back in when the remote host changes, we reduce the attack
          // surface for session hijacking. Session hijacking is still possible,
          // but only if the user is on the same remote host.
          logger.warning("Remote host for session ", sessionID, " changed from ", session.getRemoteHost(), " to ", req.getRemoteHost(), ". Deleting session and forcing the user to sign in again.");
          sessionDAO.remove(session);
          msg.replyWithException(new AuthenticationException("IP address changed. Your session was deleted to keep your account secure. Please sign in again to verify your identity."));
        }
      }

      // If this service has been configured to require authentication, then
      // throw an error if there's no user in the context.
      if ( authenticate_ && session.getUserId() == 0 ) {
        msg.replyWithException(new AuthenticationException());
        return;
      }

      X effectiveContext = session.applyTo(getX());

      session.touch();

      try {
        spec.checkAuthorization(effectiveContext);
      } catch (AuthorizationException e) {
        Group group = (Group) effectiveContext.get("group");
        logger.warning("Missing permission", group != null ? group.getId() : "NO GROUP" , "service." + spec.getName());
        msg.replyWithException(e);
        return;
      }

      msg.getLocalAttributes().put("x", effectiveContext);
      getDelegate().send(msg);
    } catch (Throwable t) {
      logger.error("Error throw in SessionServerBox: " + t, " ,service: " + spec.getName(), t);
      t.printStackTrace();
      msg.replyWithException(t);
      
      AppConfig appConfig = (AppConfig) getX().get("appConfig");
      if ( Mode.TEST == appConfig.getMode() )
        throw t;
    }
  }
}
