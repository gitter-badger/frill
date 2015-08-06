import {Action} from 'frill-core';

class AuthAction extends Action {

  constructor() {
    super();
    this.use('request', {prefix: '/api'});
  }

  setToken(token) {
    this.dispatch('AUTH_SET_TOKEN', token);
  }
}

export default new AuthAction();
