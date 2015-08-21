import {mockStoreEvent} from '../baseHelper';
import AuthAction from '../../src/actions/Auth';
import {BaseAction} from 'frill-core';
import userData from '../../src/fixtures/testUserData';

/**
 * AuthAction
 * @test {AuthAction}
 */
describe('AuthAction', () => {
  /**
   * @test {AuthAction#constructor}
   */
  it('should be an instance of FrillCore.BaseAction', () => {
    (AuthAction instanceof BaseAction).should.be.true;
  });

  /**
   * @test {AuthAction#constructor}
   */
  it('should have an access to a request() method', () => {
    AuthAction.request.should.be.a('function');
  });

  /**
   * @test {AuthAction#login}
   */
  describe('AuthAction#login', () => {
    /**
     * @test {AuthAction#login}
     */
    it('should have a login() method', () => {
      AuthAction.login.should.be.a('function');
    });
  });

  /**
   * @test {AuthAction#authenticate}
   */
  describe('AuthAction#authenticate', () => {
    /**
     * @test {AuthAction#authenticate}
     */
    it('should have an authenticate() method', () => {
      AuthAction.authenticate.should.be.a('function');
    });

    /**
     * @test {AuthAction#authenticate}
     */
    it('should dispatch AUTH_LOGIN at execution', () => {
      const spy = sinon.spy();
      mockStoreEvent(AuthAction, 'AUTH_LOGIN', spy);
      AuthAction.authenticate();
      spy.called.should.equal.true;
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, null, 'AUTH_LOGIN');
    });
  });

  /**
   * @test {AuthAction#logout}
   */
  describe('AuthAction#logout', () => {
    /**
     * @test {AuthAction#logout}
     */
    it('should have a logout() method', () => {
      AuthAction.logout.should.be.a('function');
    });

    /**
     * @test {AuthAction#logout}
     */
    it('should dispatch AUTH_LOGOUT at execution', () => {
      const spy = sinon.spy();
      mockStoreEvent(AuthAction, 'AUTH_LOGOUT', spy);
      AuthAction.logout();
      spy.called.should.equal.true;
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, null, 'AUTH_LOGOUT');
    });
  });
});
