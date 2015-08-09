/**
 * Authentication strategy for Google
 * @see https://developers.google.com/
 */
const googleStrategy = (server) => {
  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'cookie_encryption_password',
    clientId: 'yKcHqLNOXe2xKgvOTFuXCeyN3',
    clientSecret: 'woM83S28cvHcf8Ut5AcHBiX4ifqPGMnrze1VkH07QiFLVaIO7y',
    isSecure: false,
  });
};

export default googleStrategy;
