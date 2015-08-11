/**
 * Authentication strategy for Twitter
 * @see https://dev.twitter.com/
 */
const twitterStrategy = (server) => {
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'cookie_encryption_password',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    isSecure: false,
  });
};

export default twitterStrategy;
