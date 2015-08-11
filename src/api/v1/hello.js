/**
 * API testing
 */
const apiV1Hello = (/* server */) => {
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
            { code: 200, message: ''},
          ],
        },
      },
    },
    handler: (req, rep) => {
      // console.log(req.auth);
      rep({msg: 'api, hello'});
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
            { code: 200, message: ''},
            { code: 401, message: 'Unauthorized' },
          ],
        },
      },
    },
    handler: (req, rep) => {
      console.log(req.auth);
      rep({msg: 'restricted api, hello'});
    },
  }];
};

export default apiV1Hello;
