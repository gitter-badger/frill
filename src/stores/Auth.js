import {Store} from 'frill-core';
import jwtDecode from 'jwt-decode';

class AuthStore extends Store {

  constructor() {
    super();
    this._user = null;
    this._jwt = null;
    this.actions = {
      'AUTH_LOGIN': 'login',
      'AUTH_LOGOUT': 'logout',
    };
  }

  login(token) {
    // store these to localStorage
    this._jwt = token;
    this._user = jwtDecode(this._jwt);
    this.change();
  }

  logout() {
    // remove these from localStorage
    this._jwt = null;
    this._user = null;
    this.change();
  }

  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  isLoggedIn() {
    return Boolean(this._user);
  }
}

export default new AuthStore();
