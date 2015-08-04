export default (server, {helpers, models}) => {
  // const {Posts} = models;

  return [{
    method: 'GET',
    path: '/hello',
    handler: (req, rep) => {
      rep('api, hello! ---');
    },
    config: {
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
  }, {
    method: 'POST',
    path: '/hello',
    handler: (req, rep) => rep('api, hello post!'),
    config: {
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
  }];
};
