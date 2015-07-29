import helpers from '../helpers';
import APIv1 from './v1';

const apiPlugin = {
  register: (server, options, next) => {

    // Mount api versions here.
    APIv1(server, helpers, next);

  },
};

apiPlugin.register.attributes = {
  name: 'api_versioning',
  version: '1.0.0',
};

export default apiPlugin;
