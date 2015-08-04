import auth from './auth';
import apiV1 from './v1';
import {routePrefixer} from '../helpers';

export default (server) => {
  return {
    authRoutes: auth(server),
    apiRoutes: [
      ...routePrefixer('/api', apiV1(server)),
    ],
  };
};
