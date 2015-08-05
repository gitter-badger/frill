export default (server) => {
  return [{
    method: ['GET'],
    path: '/hello',
    config: {
      auth: false,
      description: 'Say hello!',
      notes: 'Says hello.',
      tags: ['api', 'greeting'],
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 400, message: 'Bad Request' },
            { code: 500, message: 'Internal Server Error'},
          ],
        },
      },
    },
    handler: (req, rep) => {
      console.log(req.auth);
      rep('api, hello! ---');
    },
  }, {
    method: ['GET'],
    path: '/hello/restricted',
    config: {
      auth: 'jwt',
      description: 'Restricted route',
      notes: 'Restricted, says hello',
      tags: ['api', 'greeting'],
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 400, message: 'Bad Request' },
            { code: 500, message: 'Internal Server Error'},
          ],
        },
      },
    },
    handler: (req, rep) => {
      console.log(req.auth);
      rep('api, restricted. Hello!');
    },
  }];
};
