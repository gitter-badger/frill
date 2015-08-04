import hello from './hello';
import {routePrefixer} from '../../helpers';

export default (server) => {
  return routePrefixer('/v1', [
    hello(server),
  ]);
};
