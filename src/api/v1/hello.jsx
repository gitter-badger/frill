export default function({Validate}) {
  return [{
    method: 'GET',
    path: '/hello',
    config: {
      handler: (req, rep) => rep('api, hello!'),
      description: 'Say hello!',
      notes: 'Says hello.',
      tags: ['api', 'greeting'],
      plugins: {
        'hapi-swagger': {
            responseMessages: [
                { code: 400, message: 'Bad Request' },
                { code: 500, message: 'Internal Server Error'}
            ]
        }
      },
    },
  }, {
    method: 'POST',
    path: '/hello',
    config: {
      handler: (req, rep) => rep('api, hello post!'),
      description: 'Say hello!',
      notes: 'Says hello.',
      tags: ['api', 'greeting'],
      plugins: {
        'hapi-swagger': {
            responseMessages: [
                { code: 400, message: 'Bad Request' },
                { code: 500, message: 'Internal Server Error'}
            ]
        }
      },
    },
  }];
}
