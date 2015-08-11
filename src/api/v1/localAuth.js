import Joi from 'joi';
import JWT from 'jsonwebtoken';
import Boom from 'boom';
import aguid from 'aguid';
import {where as _where} from 'lodash';
import {clone as _clone} from 'lodash';

// Test data
import accounts from '../../helpers/testUserData';

/**
 * Local authentication routes.
 */
const localAuthRoutes = [{
  method: ['POST'],
  path: '/login',
  config: {
    validate: {
      query: {
        ref: Joi.string().optional(),
      },
      payload: {
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
      },
    },
    tags: ['api', 'auth'],
    auth: 'local',
    // auth: 'twitter',
    plugins: {
      'hapi-swagger': {
        responseMessages: [
          { code: 400, message: 'Bad Request' },
          { code: 500, message: 'Internal Server Error'},
        ],
      },
    },
  },
  handler: (request, reply) => {
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
  },
}];

export default localAuthRoutes;
