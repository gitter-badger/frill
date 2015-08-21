import {createSandboxSpy} from '../baseHelper';
import App from '../../src/components/App/index.jsx';
// import {StoreWatchComponent} from 'frill-core';
import ExeEnv from 'react/lib/ExecutionEnvironment';
ExeEnv.canUseDOM = true;

let spy;
let frillSpy;
let component;
let shallowRenderer;

const dummyFrill = {
  store: () => {
    return {
      user: {
        user: {
          displayName: 'user',
        },
      },
      isLoggedIn: () => {
        return true;
      },
    };
  },
};

function mountComponent(frill) {
  shallowRenderer = TestUtils.createRenderer();

  const _frill = frill || dummyFrill;
  shallowRenderer.render(<App frill={_frill} />);

  component = shallowRenderer.getRenderOutput();
}

/**
 * AppComponent
 * @test {AppComponent}
 */
describe('AppComponent', () => {
  beforeEach(() => {
    spy = createSandboxSpy(App.prototype, [
      'getStateFromFrill',
    ]);

    frillSpy = sandbox.spy(dummyFrill, 'store');

    mountComponent();
  });

  /**
   * @test {AppComponent#constructor}
   */
  // it('should be an instance of FrillCore.StoreWatchComponent', () => {
  //   mountComponent();
  // });

  /**
   * @test {AppComponent#constructor}
   * @test {AppComponent#getStateFromFrill}
   */
  it('should have appropriate state', () => {
    const returned = spy.getStateFromFrill.getCall(0).returnValue;
    sinon.assert.calledOnce(spy.getStateFromFrill);
    returned.isLoggedIn.should.equal(dummyFrill.store().isLoggedIn());
    frillSpy.getCall(0).args[0].should.equal('Auth');
    returned.user.should.eql(dummyFrill.store().user);
    frillSpy.getCall(1).args[0].should.equal('Auth');
  });

  /**
   * @test {AppComponent#render}
   */
  describe('AppComponent#render', () => {
    /**
     * @test {AppComponent#render}
     */
    it('should have className \'App\'', () => {
      component.props.className.should.equal('App');
    });

    /**
     * @test {AppComponent#render}
     */
    it('should display different message depending on login status', () => {
      const display = component.props.children[2].props.children.join('');
      display.should.equal('Hello, user');
    });

    it('should display different message depending on login status 2', () => {
      const anotherFrill = {
        store: () => {
          return {
            user: {
              user: {
                displayName: 'user',
              },
            },
            isLoggedIn: () => {
              return false;
            },
          };
        },
      };
      mountComponent(anotherFrill);
      component.props.children[2].props.children.should.equal('Welcome, Guest');
    });
  });
});
