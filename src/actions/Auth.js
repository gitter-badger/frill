import {BaseAction} from 'frill-core';

/**
 * Authentication actions
 * @extends {BaseAction}
 * @example <caption>via react or frill component</caption>
 * // logging in
 * this.getFrill().action('Auth').login('token');
 * // logging out
 * this.getFrill().action('Auth').logout();
 */
class AuthAction extends BaseAction {

  /**
   * Constructor
   */
  constructor() {
    super();
    // this.use('request', {prefix: '/api'});
  }

  /**
   * Login action
   * @param {string} token - a valid JWT token
   * @emits {AUTH_LOGIN}
   */
  login(token) {
    this.dispatch('AUTH_LOGIN', token);
  }

  /**
   * Login action
   * @emits {AUTH_LOGOUT}
   */
  logout() {
    this.dispatch('AUTH_LOGOUT');
  }
}

/**
 * export AuthAction instance
 */
export default new AuthAction();
