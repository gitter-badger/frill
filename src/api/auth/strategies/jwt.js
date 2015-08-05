import {where as _where} from 'lodash';
import hapiAuthJwt from 'hapi-auth-jwt2';

// Test data
import accounts from '../../../helpers/testUserData';

const validator = (decoded, request, callback) => {
  if (!_where(accounts, {id: decoded.id})) {
    return callback(null, false);
  } else {
    console.log(decoded);
    return callback(null, true);
  }
};

const jwtStrategy = (server) => {
  server.register(hapiAuthJwt, (err) => {
    if (err) server.log(['error'], 'jwt-validator load error');

    server.auth.strategy('jwt', 'jwt', true, {
      key: 'NeverShareYourSecret',
      // key: 'VQkdGKTWhA4FJHWYXkps7q8q8SNQGvdFjVob2hlEVjQ8AijsWAOdPxkThiDQsDg',
      validateFunc: validator,
      verifyOptions: { algorithms: ['HS256'] },
    });
  });
};

export default jwtStrategy;
