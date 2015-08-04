export default (server) => {
  // const {Posts} = models;
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'cookie_encryption_password',
    clientId: 'yKcHqLNOXe2xKgvOTFuXCeyN3',
    clientSecret: 'woM83S28cvHcf8Ut5AcHBiX4ifqPGMnrze1VkH07QiFLVaIO7y',
    isSecure: false,
  });

  return {
    auth: {
      strategy: 'twitter',
      mode: 'try',
    },
    tags: ['api', 'auth'],
    handler: (request, reply) => {
      console.log(request.auth);
      if (!request.auth.isAuthenticated) {
        return reply(
          'Authentication failed due to: ' + request.auth.error.message
        );
      }
      return reply.redirect('/');
    },
  };
};
