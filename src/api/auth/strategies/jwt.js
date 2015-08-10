import hapiAuthJwt from 'hapi-auth-jwt2';
import {where as _where} from 'lodash';

// Test data
import accounts from '../../../helpers/testUserData';

const validator = (decoded, request, callback) => {
  /**
   * construct search query
   * @todo: search from session
   */
  const query = {
    id: parseInt(decoded.user.id, 10),
  };
  const user = _where(accounts, query);
  if (user.length === 0) {
    return callback(null, false);
  } else {
    return callback(null, true);
  }
};

/**
 * Authentication strategy for JsonWebTokens(JWT)
 * @see http://jwt.io/
 */
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
