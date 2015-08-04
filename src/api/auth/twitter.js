export default {
  method: ['GET', 'POST'],
  path: '/twitter/login',
  config: {
    tags: ['api', 'auth'],
    auth: { strategy: 'twitter', mode: 'try' },
  },
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
