import Boom from 'boom';
import {where as _where} from 'lodash';

// Test data
import accounts from '../../../fixtures/testUserData';

const authenticate = (request, reply) => {
  const credentials = {};
  reply.continue({ credentials });
};

const payload = (request, reply) => {
  // construct search query
  if (!request.payload) {
    return reply(Boom.badRequest('invalid username or password'));
  }

  const query = {
    name: request.payload.username,
    password: request.payload.password,
  };

  let user = _where(accounts, query);

  if (user.length === 0) {
    return reply(Boom.badRequest('invalid username or password'));
  }

  user = user[0];

  request.auth.credentials = {
    provider: 'local',
    token: null,
    secret: null,
    query: {},
    profile: {
      id: user.id,
      username: user.name,
      displayName: user.displayName,
      raw: user, // full profile
    },
  };

  reply.continue();
};

const response = (request, reply) => {
  reply.continue();
};

const scheme = () => {
  return {
    payload,
    authenticate,
    response,
    options: {
      payload: true,
    },
  };
};

/**
 * Authentication strategy for local authentications
 */
const localStrategy = (server) => {
  server.auth.scheme('local', scheme);
  server.auth.strategy('local', 'local');
};

export default localStrategy;
