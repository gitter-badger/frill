import {routePrefixer} from '../../src/helpers';

const testRouteObj = {
  path: '/path',
};

const testRouteArr = [
  {
    path: '/first',
  },
  {
    path: '/second',
  },
  {
    path: '/third',
  },
];

/**
 * Route prefixer
 * @test {routePrefixer}
 */
describe('routePrefixer', () => {
  /**
   * @test {routePrefixer}
   */
  it('should throw an error if the given params are not correct', () => {
    const testPrefixFn = () => routePrefixer(null, testRouteObj);
    const testRouteFn = () => routePrefixer('/prefix', {});
    const testRouteFn2 = () => routePrefixer('/prefix', []);
    (testPrefixFn).should.throw(TypeError, /be a string/);
    (testRouteFn).should.throw(Error, /specify routes/);
    (testRouteFn2).should.throw(Error, /specify routes/);
  });

  /**
   * @test {routePrefixer}
   */
  it('should throw an error if route(s) don\'t have route.path', () => {
    const illegalRouteObj = {handler: () => {}};
    const testRouteObjFn = () => routePrefixer('/prefix', illegalRouteObj);
    const testRouteArrFn = () => routePrefixer('/prefix', [illegalRouteObj]);

    (testRouteObjFn).should.throw(Error, /A route must have routes.path/);
    (testRouteArrFn).should.throw(Error, /All routes must contain route.path/);
  });

  /**
   * @test {routePrefixer}
   */
  it('should always return an array', () => {
    const outputFromObj = routePrefixer('/added', testRouteObj);
    const outputFromArr = routePrefixer('/added', testRouteArr);
    outputFromObj.should.be.instanceof(Array);
    outputFromArr.should.be.instanceof(Array);
  });

  /**
   * @test {routePrefixer}
   */
  it('should be able to prefix routes as an Object', () => {
    const testRouteOutput = routePrefixer('/added', testRouteObj);
    (testRouteOutput[0].path).should.equal('/added/path');
  });

  /**
   * @test {routePrefixer}
   */
  it('should be able to prefix routes as an Array', () => {
    const testRouteOutput = routePrefixer('/added', testRouteArr);
    (testRouteOutput[0].path).should.equal(`/added${testRouteArr[0].path}`);
    (testRouteOutput[1].path).should.equal(`/added${testRouteArr[1].path}`);
    (testRouteOutput[2].path).should.equal(`/added${testRouteArr[2].path}`);
  });
});
