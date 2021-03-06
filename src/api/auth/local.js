import Joi from 'joi';
import {localAuthHandler} from './authHandlers';

/**
 * Local authentication routes.
 */
const localAuthRoutes = [{
  method: ['POST'],
  path: '/login',
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
  handler: localAuthHandler,
}];

export default localAuthRoutes;
