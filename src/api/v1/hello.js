export default (server) => {
  return {
    handler: (req, rep) => {
      rep('api, hello! ---');
    },
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
  };
};
