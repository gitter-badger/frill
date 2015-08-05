const facebookStrategy = (server) => {
  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: 'cookie_encryption_password',
    clientId: 'yKcHqLNOXe2xKgvOTFuXCeyN3',
    clientSecret: 'woM83S28cvHcf8Ut5AcHBiX4ifqPGMnrze1VkH07QiFLVaIO7y',
    isSecure: false,
  });
};

export default facebookStrategy;
