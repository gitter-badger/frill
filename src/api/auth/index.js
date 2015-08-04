import {twitterStrategy} from './strategies';
import twitter from './twitter';
import {routePrefixer} from '../../helpers';

export default (server) => {
  // use Twitter strategy
  twitterStrategy(server);

  return routePrefixer('/auth', [
    twitter,
  ]);
};

// export default (server, {helpers, models}) => {
//   const authPlugin = {
//     register: (_server, _options, next) => {
//       // mount auths here
//       _server.route([
//         twitter(server, {helpers, models}),
//       ]);
//       next();
//     },
//   };
//   authPlugin.register.attributes = {
//     name: 'auth',
//     version: '1.0.0',
//   };
//
//   return authPlugin;
// };

//
// export default (server, {helpers, models}, next) => {
//   // add auth strategy
//   server.auth.strategy('twitter', 'bell', {
//     provider: 'twitter',
//     password: 'cookie_encryption_password',
//     clientId: 'yKcHqLNOXe2xKgvOTFuXCeyN3',
//     clientSecret: 'woM83S28cvHcf8Ut5AcHBiX4ifqPGMnrze1VkH07QiFLVaIO7y',
//     isSecure: false,
//   });
//
//   const auth = {
//     register: (_server, options, _next) => {
//       _server.route(twitter(server, {helpers, models}));
//       _next();
//     },
//   };
//
//   auth.register.attributes = {
//     name: 'auth',
//     version: '0.0.0',
//   };
//
//   server.register({
//     register: auth,
//   }, {
//     routes: {
//       prefix: '/auth',
//     },
//   }, next);
// };
