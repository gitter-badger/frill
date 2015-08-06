import {Store} from 'frill-core';

class AuthStore extends Store {

  constructor() {
    super();
    this._jwt = null;
    this.actions = {
      'AUTH_SET_TOKEN': 'setToken',
      'AUTH_GET_TOKEN': 'getToken',
    };
  }

  setToken(token) {
    this._jwt = token;
  }

  getToken() {
    return this._jwt;
  }

}

export default new AuthStore();
