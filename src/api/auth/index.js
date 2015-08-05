import {routePrefixer} from '../../helpers';

// import strategies to use
import {
  jwtStrategy,
  twitterStrategy,
  googleStrategy,
  facebookStrategy,
} from './strategies';

// import authentication routes
import twitter from './twitter';
// import facebook from './facebook';
// import google from './google';

export default (server) => {
  // use JsonWebTokens (you shouldn't remove this)
  jwtStrategy(server);

  /**
   * Define strategies to use
   */

  // use Twitter strategy
  twitterStrategy(server);

  // use facebookStrategy
  facebookStrategy(server);

  // use googleStrategy
  googleStrategy(server);

  return routePrefixer('/auth', [
    twitter,
  ]);
};
