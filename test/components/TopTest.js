import {createSandboxSpy} from '../baseHelper';
import Top from '../../src/components/Top/index.jsx';
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
      count: 0,
      scrollItems: [],
      scrollItemsCount: 0,
      scrollItemTotal: 10,
    };
  },
  action: () => {
    return {
      countUp: sandbox.spy(),
      countUpBy: sandbox.spy(),
      loadScrollItems: sandbox.spy(),
    };
  },
};

function mountComponent(frill) {
  shallowRenderer = TestUtils.createRenderer();

  const _frill = frill || dummyFrill;
  shallowRenderer.render(<Top frill={_frill} />);

  component = shallowRenderer.getRenderOutput();
}

/**
 * TopComponent
 * @test {TopComponent}
 */
describe('TopComponent', () => {
  beforeEach(() => {
    spy = createSandboxSpy(Top.prototype, [
      'getStateFromFrill',
    ]);

    frillSpy = createSandboxSpy(dummyFrill, [
      'store',
      'action',
    ]);

    mountComponent();
  });

  /**
   * @test {TopComponent#constructor}
   * @test {TopComponent#getStateFromFrill}
   */
  it('should have appropriate state', () => {
    const returned = spy.getStateFromFrill.getCall(0).returnValue;
    const dummy = dummyFrill.store('Example');
    sinon.assert.calledOnce(spy.getStateFromFrill);
    returned.count.should.equal(dummy.count);
    frillSpy.store.getCall(0).args[0].should.equal('Example');
    returned.scrollItems.should.eql(dummy.scrollItems);
    frillSpy.store.getCall(1).args[0].should.equal('Example');
    returned.scrollItemsCount.should.equal(dummy.scrollItemsCount);
    frillSpy.store.getCall(2).args[0].should.equal('Example');
    returned.scrollItemTotal.should.equal(dummy.scrollItemTotal);
    frillSpy.store.getCall(3).args[0].should.equal('Example');
  });

  /**
   * @test {TopComponent#onOne}
   */
  describe('TopComponent#onOne', () => {
    /**
     * @test {TopComponent#onOne}
     * @test {TopComponent#render}
     */
    it('should execute a countUp() method of an Example Action', () => {
      component.props.children[1].props.children[2].props.onClick();

      sinon.assert.called(frillSpy.action);

      const called = frillSpy.action.getCall(0);
      called.args[0].should.equal('Example');
      sinon.assert.called(called.returnValue.countUp);
    });
  });

  /**
   * @test {TopComponent#onTen}
   */
  describe('TopComponent#onTen', () => {
    /**
     * @test {TopComponent#onTen}
     * @test {TopComponent#render}
     */
    it('should execute a countUpBy() method of an Example Action', () => {
      component.props.children[1].props.children[3].props.onClick();

      sinon.assert.called(frillSpy.action);

      const called = frillSpy.action.getCall(0);
      called.args[0].should.equal('Example');
      sinon.assert.called(called.returnValue.countUpBy);
      called.returnValue.countUpBy.getCall(0).args[0].should.equal(10);
    });
  });

  /**
   * @test {TopComponent#onFetchItems}
   */
  describe('TopComponent#onFetchItems', () => {
    /**
     * @test {TopComponent#onFetchItems}
     * @test {TopComponent#render}
     */
    it('should execute a loadScrollItems() method of an Example Action', () => {
      component.props.children[2].props.children[1].props.fetchData();

      sinon.assert.called(frillSpy.action);

      const called = frillSpy.action.getCall(0);
      called.args[0].should.equal('Example');
      const returned = called.returnValue.loadScrollItems;
      sinon.assert.called(returned);
      returned.getCall(0).args[0].should.equal(0);
      returned.getCall(0).args[1].should.equal(5);
    });
  });

  /**
   * @test {TopComponent#render}
   */
  describe('AppComponent#render', () => {
    /**
     * @test {TopComponent#render}
     */
    it('should have className \'Top\'', () => {
      component.props.className.should.equal('Top');
    });
  });
});
