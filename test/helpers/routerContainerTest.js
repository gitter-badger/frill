import {routerContainer} from '../../src/helpers';

/**
 * Router container
 * @test {routerContainer}
 */
describe('routePrefixer', () => {
  /**
   * @test {routePrefixer}
   */
  it('should have a get() method', () => {
    routerContainer.get.should.be.a('function');
  });

  /**
   * @test {routePrefixer}
   */
  it('should have a set() method', () => {
    routerContainer.set.should.be.a('function');
  });

  /**
   * @test {routePrefixer}
   */
  it('should be able to set and get a router', () => {
    const testRouter = {test: true};
    routerContainer.set(testRouter);
    (routerContainer.get()).should.equal(testRouter);
  });
});
