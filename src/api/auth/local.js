import Joi from 'joi';
import {authHandler} from './authHandlers';

/**
 * Local authentication routes.
 */
const localAuthRoutes = [{
  method: ['POST'],
  path: '/local/login',
  config: {
    validate: {
      query: {
        ref: Joi.string(),
      },
      payload: {
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
      },
    },
    tags: ['api', 'auth'],
    auth: 'local',
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
}];

export default localAuthRoutes;
