import JWT from 'jsonwebtoken';
import Boom from 'boom';
import aguid from 'aguid';
import {where as _where} from 'lodash';
import {clone as _clone} from 'lodash';

// Test data
import accounts from '../../fixtures/testUserData';

/**
 * Handler for authentication
 */
const authHandler = (request, reply) => {
  // reply error when authentication fails
  if (!request.auth.isAuthenticated) {
    return reply(
      Boom.unauthorized('Authentication failed due to: ' +
        request.auth.error.message)
    );
  }

  const query = {
    id: parseInt(request.auth.credentials.profile.id, 10),
    strategy: request.auth.strategy,
  };

  const user = _where(accounts, query);
  // console.log(user);

  if (user.length === 0) {
    console.log('needs registration');
  }

  delete user[0].password;

  /** @todo create and set JWT into session */
  const session = {
    valid: true,
    id: aguid(), // a random session id
    user: user[0],
    exp: new Date().getTime() + 30 * 60 * 1000, // expires in 30 minutes time
  };

  // TODO: create the session in Redis
  // redisClient.set(session.id, JSON.stringify(session));
  request.session.set(session.id, session);
  // sign the session as a JWT
  const token = JWT.sign(session, 'NeverShareYourSecret');
  // console.log(token);
  request.session.flash('token', token);
  return reply.redirect(request.query.ref || '/');
};

const localAuthHandler = (request, reply) => {
  // reply error when authentication fails
  if (!request.auth.isAuthenticated) {
    return reply(
      Boom.unauthorized('Authentication failed due to: ' +
        request.auth.error.message)
    );
  }

  const query = {
    id: parseInt(request.auth.credentials.profile.id, 10),
    strategy: request.auth.strategy,
  };

  const user = _where(accounts, query);

  if (user.length === 0) {
    console.log('needs registration');
  }

  const _user = _clone(user[0]);
  delete _user.password;

  /** @todo create and set JWT into session */
  const session = {
    valid: true,
    id: aguid(), // a random session id
    user: _user,
    exp: new Date().getTime() + 30 * 60 * 1000, // expires in 30 minutes time
  };

  // // create the session in Redis
  // redisClient.set(session.id, JSON.stringify(session));
  request.session.set(session.id, session);
  // sign the session as a JWT
  const token = JWT.sign(session, 'NeverShareYourSecret');
  return reply({token: token});
};

/**
 * Handler for site registration
 */
// const registrationHandler = (request, reply) => {
//
// };

/**
 * Export all authentication handlers
 */
const authHandlers = {
  authHandler,
  localAuthHandler,
  // registrationHandler,
};

export default authHandlers;
