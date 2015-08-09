import {BaseStore} from 'frill-core';
import jwtDecode from 'jwt-decode';

/**
 * Authentication store
 * @extends {FrillCore.BaseStore}
 * @example <caption>via frill component</caption>
 * this.getFrill().store('Auth').jwt // get JWT
 * @example <caption>via frill action</caption>
 * this.dispatch('AUTH_LOGIN', token); // login with JWT
 */
class AuthStore extends BaseStore {

  /**
   * Constructor
   */
  constructor() {
    super();
    this._user = null;
    this._jwt = null;

    /**
     * Actions to listen
     * @param {Object} actions
     * @listens {AUTH_LOGIN}
     * @listens {AUTH_LOGOUT}
     */
    this.actions = {
      'AUTH_LOGIN': 'login',
      'AUTH_LOGOUT': 'logout',
    };
  }

  /**
   * Login using JWT
   * @param {string} token - a valid JsonWebToken
   * @emits {change}
   * @see http://jwt.io/
   */
  login(token) {
    // store these to localStorage
    this._jwt = token;
    this._user = jwtDecode(this._jwt);
    this.change();
  }

  /**
   * Logout
   * @emits {change}
   */
  logout() {
    // remove these from localStorage
    this._jwt = null;
    this._user = null;
    this.change();
  }

  /**
   * User data
   * @type {Object}
   */
  get user() {
    return this._user;
  }

  /**
   * JsonWebToken
   * @type {string}
   */
  get jwt() {
    return this._jwt;
  }

  /**
   * Check if logged in
   * @returns {boolean}
   */
  isLoggedIn() {
    return Boolean(this._user);
  }
}


/**
 * Export AuthStore instance
 */
export default new AuthStore();
