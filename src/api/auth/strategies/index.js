import jwtStrategy from './jwt';
import localStrategy from './local';
import twitterStrategy from './twitter';
import facebookStrategy from './facebook';
import googleStrategy from './google';
// import githubStrategy from './github';

const Strategies = {
  jwtStrategy,
  localStrategy,
  twitterStrategy,
  facebookStrategy,
  googleStrategy,
  // githubStrategy,
};

export default Strategies;
