import config from 'config';
/**
 * Authentication strategy for Twitter
 * @see https://dev.twitter.com/
 */
const twitterStrategy = (server) => {
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: config.get('strategies.twitter.password'),
    clientId: config.get('strategies.twitter.clientId'),
    clientSecret: config.get('strategies.twitter.clientSecret'),
    isSecure: config.get('strategies.twitter.isSecure'),
  });
};

export default twitterStrategy;
