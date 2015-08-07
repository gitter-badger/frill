import {Action} from 'frill-core';

class AuthAction extends Action {

  constructor() {
    super();
    this.use('request', {prefix: '/api'});
  }

  login(token) {
    this.dispatch('AUTH_LOGIN', token);
  }

  logout() {
    this.dispatch('AUTH_LOGOUT');
  }
}

export default new AuthAction();
