import helpers from '../helpers';
import models from '../models';
import apiV1 from './v1';

const apiPlugin = {
  register: (server, options, next) => {
    // Mount api versions here.
    apiV1(server, {helpers, models}, next);
  },
};

apiPlugin.register.attributes = {
  name: 'api_versioning',
  version: '1.0.0',
};

export default apiPlugin;
