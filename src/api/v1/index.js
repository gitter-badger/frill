import hello from './hello';
import {routePrefixer} from '../../helpers';

const apiV1 = (server) => {
  return routePrefixer('/v1', [
    ...hello(server),
  ]);
};
export default apiV1;
