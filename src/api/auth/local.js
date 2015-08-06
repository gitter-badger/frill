import Joi from 'joi';
import {authHandler} from './authHandlers';

export default [{
  method: ['POST'],
  path: '/local/login',
  config: {
    validate: {
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
