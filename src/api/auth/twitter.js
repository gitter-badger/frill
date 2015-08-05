import {authHandler} from './authHelper';

export default {
  method: ['GET', 'POST'],
  path: '/twitter/login',
  config: {
    tags: ['api', 'auth'],
    auth: { strategy: 'twitter', mode: 'try' },
    // auth: 'twitter',
    plugins: {
      'hapi-swagger': {
        responseMessages: [
          { code: 400, message: 'Bad Request' },
          { code: 500, message: 'Internal Server Error'},
        ],
      },
    },
  },
  handler: authHandler,
};
