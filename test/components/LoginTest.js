import {createSandboxSpy} from '../baseHelper';
import Login from '../../src/components/Login/index.jsx';
import ExeEnv from 'react/lib/ExecutionEnvironment';
ExeEnv.canUseDOM = true;

let spy;
let frillSpy;
let container;
let component;

const dummyFrill = {
  action: () => {
    return {
      login: sandbox.spy(),
    };
  },
};

function mountComponent() {
  container = document.createElement('div');
  document.body.appendChild(container);

  component = React.render(<Login frill={dummyFrill} />, container);
}

function unmountComponent() {
  if (container) {
    React.unmountComponentAtNode(container);
  }
}

/**
 * LoginComponent
 * @test {LoginComponent}
 */
describe('LoginComponent', () => {
  beforeEach(() => {
    spy = createSandboxSpy(Login.prototype, [
      'onClick',
      'render',
    ]);

    frillSpy = sandbox.spy(dummyFrill, 'action');
  });

  afterEach(() => {
    unmountComponent();
  });

  /**
   * @test {LoginComponent#constructor}
   */
  it('should be an instance of React.Component', () => {
    mountComponent();
    TestUtils.isCompositeComponent(component).should.be.true;
  });

  /**
   * @test {LoginComponent#onClick}
   */
  describe('LoginComponent#onClick', () => {
    /**
     * @test {LoginComponent#onClick}
     */
    it('should have onClick() method', () => {
      mountComponent();
      component.onClick.should.be.a('function');
    });
    /**
     * @test {LoginComponent#onClick}
     */
    it('should call a login() method of an Auth Action', () => {
      mountComponent();
      React.findDOMNode(component.refs.username).value = 'username';
      React.findDOMNode(component.refs.password).value = 'password';
      const button = TestUtils
        .findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.Simulate.click(React.findDOMNode(button), {
        preventDefault: () => {},
      });

      frillSpy.getCall(0).args[0].should.equal('Auth');
      const returned = frillSpy.getCall(0).returnValue.login;
      sinon.assert.called(returned);
      returned.getCall(0).args[0].should.equal('username');
      returned.getCall(0).args[1].should.equal('password');
    });
  });
});
