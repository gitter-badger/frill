import {BaseAction} from 'frill-core';
import routerContainer from '../helpers/routerContainer';

/**
 * Authentication actions
 * @extends {FrillCore.BaseAction}
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
    this.use('request', {prefix: '/api'});
  }

  /**
   * Login action
   * @param {string} username - username from login form
   * @param {string} password - password from login form
   */
  login(username, password) {
    this.request.post('/api/login')
    .send({ username: username, password: password }).end((err, res) => {
      if (err) {
        console.log(err);
      }
      if (res.status === 200) {
        routerContainer.get().transitionTo('/');
        this.authenticate(res.body.token);
      }
    });
  }

  /**
   * Authenticate action
   * @param {string} token - a valid JWT token
   * @emits {AUTH_LOGIN}
   */
  authenticate(token) {
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
