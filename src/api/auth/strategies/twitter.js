/**
 * Authentication strategy for Twitter
 * @see https://dev.twitter.com/
 */
const twitterStrategy = (server) => {
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'cookie_encryption_password',
    clientId: 'yKcHqLNOXe2xKgvOTFuXCeyN3',
    clientSecret: 'woM83S28cvHcf8Ut5AcHBiX4ifqPGMnrze1VkH07QiFLVaIO7y',
    isSecure: false,
  });
};

export default twitterStrategy;