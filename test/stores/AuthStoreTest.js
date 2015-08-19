import {mockDispatch} from '../baseHelper';
import AuthStore from '../../src/stores/Auth';
import {BaseStore} from 'frill-core';

/**
 * AuthStore
 * @test {AuthStore}
 */
describe('AuthStore', () => {
  /**
   * @test {AuthStore#constructor}
   */
  it('should be an instance of FrillCore.BaseStore', () => {
    (AuthStore instanceof BaseStore).should.be.true;
  });

  /**
   * @test {AuthStore#constructor}
   */
  it('should have appropriate properties and defaults', () => {
    should.equal(AuthStore._user, null);
    should.equal(AuthStore._jwt, null);
  });

  /**
   * @test {AuthStore#actions}
   */
  describe('AuthStore#actions', () => {
    /**
     * @test {AuthStore#actions}
     */
    it('should handle AUTH_LOGIN', () => {
      AuthStore._actions.AUTH_LOGIN.should.exist;
    });

    /**
     * @test {AuthStore#actions}
     */
    it('should handle AUTH_LOGOUT', () => {
      AuthStore._actions.AUTH_LOGOUT.should.exist;
    });
  });

  /**
   * @test {AuthStore#login}
   */
  describe('AuthStore#login', () => {
    /**
     * @test {AuthStore#login}
     */
    it('should have a login() method', () => {
      AuthStore.login.should.be.a('function');
    });

    /**
     * @test {AuthStore#login}
     */
    it('should be able to handle dispatched actions', () => {
      (() => {
        mockDispatch(AuthStore, 'AUTH_LOGIN', 'token');
      }).should.throw();
    });
  });

  /**
   * @test {AuthStore#logout}
   */
  describe('AuthStore#logout', () => {
    /**
     * @test {AuthStore#logout}
     */
    it('should have a logout() method', () => {
      AuthStore.logout.should.be.a('function');
    });

    /**
     * @test {AuthStore#logout}
     */
    it('should be able to handle dispatched actions', () => {
      mockDispatch(AuthStore, 'AUTH_LOGOUT');
      should.equal(AuthStore._user, null);
      should.equal(AuthStore._jwt, null);
    });
  });

  /**
   * @test {AuthStore#isLoggedIn}
   */
  describe('AuthStore#isLoggedIn', () => {
    /**
     * @test {AuthStore#isLoggedIn}
     */
    it('should return false when user in not logged in', () => {
      AuthStore.isLoggedIn().should.equal(false);
    });
  });
});
