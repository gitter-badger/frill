/**
 * Authentication strategy for github
 * @see https://developer.github.com/
 */
const githubStrategy = (server) => {
  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: 'cookie_encryption_password',
    clientId: 'yKcHqLNOXe2xKgvOTFuXCeyN3',
    clientSecret: 'woM83S28cvHcf8Ut5AcHBiX4ifqPGMnrze1VkH07QiFLVaIO7y',
    isSecure: false,
  });
};

export default githubStrategy;
