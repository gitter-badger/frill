import config from 'config';
/**
 * Authentication strategy for Twitter
 * @see https://dev.twitter.com/
 */
const twitterStrategy = (server) => {
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: config.get('starategies.twitter.password'),
    clientId: config.get('starategies.twitter.clientId'),
    clientSecret: config.get('starategies.twitter.clientSecret'),
    isSecure: config.get('starategies.twitter.isSecure'),
  });
};

export default twitterStrategy;
