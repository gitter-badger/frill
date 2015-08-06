import {routePrefixer} from '../../helpers';

// import strategies to use
import {
  jwtStrategy,
  localStrategy,
  twitterStrategy,
  googleStrategy,
  facebookStrategy,
} from './strategies';

// import authentication routes
import local from './local';
import twitter from './twitter';
// import facebook from './facebook';
// import google from './google';

export default (server) => {
  /**
   * Define strategies to use
   */

  // use JsonWebTokens (you shouldn't remove this)
  jwtStrategy(server);

  // use Local strategy
  localStrategy(server);

  // use Twitter strategy
  twitterStrategy(server);

  // use facebookStrategy
  facebookStrategy(server);

  // use googleStrategy
  googleStrategy(server);

  return routePrefixer('/auth', [
    ...local,
    ...twitter,
  ]);
};
