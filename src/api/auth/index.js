import {routePrefixer} from '../../helpers';
import Strategies from './strategies';

// import authentication routes
import twitter from './twitter';
// import facebook from './facebook';
// import google from './google';

/**
 * All routes used in authentication
 * @return {Array<function>} - Authentication routes
 */
const authRoutes = (server) => {
  // use JsonWebTokens (you shouldn't remove this)
  Strategies.jwtStrategy(server);

  // use Local strategy
  Strategies.localStrategy(server);

  // use Twitter strategy
  Strategies.twitterStrategy(server);

  // use facebookStrategy
  Strategies.facebookStrategy(server);

  // use googleStrategy
  Strategies.googleStrategy(server);

  return routePrefixer('/auth', [
    ...twitter,
  ]);
};

export default authRoutes;
