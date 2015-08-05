import Boom from 'boom';

// Test data
import accounts from '../../../helpers/testUserData';

const authenticate = (request, reply) => {
  // const query = {
  //   username: ,
  //   password:,
  // };
  // if (!_where(accounts, query)) {
  //   return callback(null, false);
  // } else {
  //   console.log(decoded);
  //   return callback(null, true);
  // }
  console.log('auth', request.method);

  // reply(true, 'hi', {payload: {id: 1}});
  const credentials = {
    provider: 'local',
    token: null,
    secret: null,
    query: {},
    profile: {
      id: '2524104246',
      username: 'nanopx',
      displayName: 'nanopx',
      raw: {}, // full profile
    },
  };
  reply.continue({ credentials });
};

const payload = (request, reply) => {

  console.log('payload', request.payload);
  reply.continue();
};

const response = (request, reply) => {
  console.log('response', request.validate);

  if (!request.payload.username || !request.payload.password) {
    console.log('AAAAAA');
    return reply(Boom.badRequest('Please enter username and password'));
  }
  reply.continue();
};

const scheme = (server, options) => {
  console.log(options);
  return {
    payload,
    authenticate,
    response,
    options: {
      payload: true,
    },
  };
};

const localStrategy = (server) => {
  server.auth.scheme('local', scheme);
  server.auth.strategy('local', 'local', {
    example: 'opt',
  });
};

export default localStrategy;
