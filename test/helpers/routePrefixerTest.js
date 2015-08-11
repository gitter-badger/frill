import {routePrefixer} from '../../src/helpers';
import {cloneDeep as _cloneDeep} from 'lodash';

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
    // ensure that the testRouteObj doesn't change
    const _testRouteObj = _cloneDeep(testRouteObj);
    const testPrefixFn = () => routePrefixer(null, _testRouteObj);
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
    // ensure that the testRouteObj and testRouteArr doesn't change
    const _testRouteObj = _cloneDeep(testRouteObj);
    const _testRouteArr = _cloneDeep(testRouteArr);

    const outputFromObj = routePrefixer('/added', _testRouteObj);
    const outputFromArr = routePrefixer('/added', _testRouteArr);
    outputFromObj.should.be.instanceof(Array);
    outputFromArr.should.be.instanceof(Array);
  });

  /**
   * @test {routePrefixer}
   */
  it('should be able to prefix routes as an Object', () => {
    // ensure that the testRouteObj doesn't change
    const _testRouteObj = _cloneDeep(testRouteObj);
    const testRouteOutput = routePrefixer('/added', _testRouteObj);
    (testRouteOutput[0].path).should.equal('/added/path');
  });

  /**
   * @test {routePrefixer}
   */
  it('should be able to prefix routes as an Array', () => {
    // ensure that the testRouteArr doesn't change
    const _testRouteArr = _cloneDeep(testRouteArr);
    const testRouteOutput = routePrefixer('/added', _testRouteArr);
    (testRouteOutput[0].path).should.equal(`/added${testRouteArr[0].path}`);
    (testRouteOutput[1].path).should.equal(`/added${testRouteArr[1].path}`);
    (testRouteOutput[2].path).should.equal(`/added${testRouteArr[2].path}`);
  });
});
