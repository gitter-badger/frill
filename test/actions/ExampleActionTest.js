import {mockStoreEvent} from '../frillHelper';
import ExampleAction from '../../src/actions/Example';
import {BaseAction} from 'frill-core';
import scrollData from '../../src/helpers/testScrollItemsData';

/**
 * ExampleAction
 * @test {ExampleAction}
 */
describe('ExampleAction', () => {
  /**
   * @test {ExampleAction#constructor}
   */
  it('should be an instance of FrillCore.BaseAction', () => {
    (ExampleAction instanceof BaseAction).should.be.true;
  });

  /**
   * @test {ExampleAction#countUp}
   */
  describe('ExampleAction#countUp', () => {
    /**
     * @test {ExampleAction#countUp}
     */
    it('should have a countUp() method', () => {
      ExampleAction.countUp.should.be.a('function');
    });

    /**
     * @test {ExampleAction#countUp}
     */
    it('should dispatch COUNT_UP at execution', () => {
      const spy = sinon.spy();
      mockStoreEvent(ExampleAction, 'COUNT_UP', spy);
      ExampleAction.countUp();
      spy.called.should.equal.true;
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, null, 'COUNT_UP');
    });
  });

  /**
   * @test {ExampleAction#countUpBy}
   */
  describe('ExampleAction#countUpBy', () => {
    /**
     * @test {ExampleAction#countUpBy}
     */
    it('should have a countUpBy() method', () => {
      ExampleAction.countUpBy.should.be.a('function');
    });

    /**
     * @test {ExampleAction#countUpBy}
     */
    it('should dispatch COUNT_UP_BY at execution', () => {
      const spy = sinon.spy();
      mockStoreEvent(ExampleAction, 'COUNT_UP_BY', spy);
      ExampleAction.countUpBy();
      spy.called.should.equal.true;
    });

    /**
     * @test {ExampleAction#countUpBy}
     */
    it('should count up by 1 at default', () => {
      const spy = sinon.spy();
      mockStoreEvent(ExampleAction, 'COUNT_UP_BY', spy);
      ExampleAction.countUpBy();
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, 1, 'COUNT_UP_BY');
    });

    /**
     * @test {ExampleAction#countUpBy}
     */
    it('should be able to provide a number to count up', () => {
      const spy = sinon.spy();
      mockStoreEvent(ExampleAction, 'COUNT_UP_BY', spy);
      ExampleAction.countUpBy(10);
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, 10, 'COUNT_UP_BY');
    });
  });

  /**
   * @test {ExampleAction#loadScrollItems}
   */
  describe('ExampleAction#loadScrollItems', () => {
    /**
     * @test {ExampleAction#loadScrollItems}
     */
    it('should have a loadScrollItems() method', () => {
      ExampleAction.loadScrollItems.should.be.a('function');
    });

    /**
     * @test {ExampleAction#loadScrollItems}
     */
    it('should dispatch LOAD_SCROLL_ITEMS at execution', (done) => {
      const spy = sinon.spy();
      mockStoreEvent(ExampleAction, 'LOAD_SCROLL_ITEMS', spy);
      ExampleAction.loadScrollItems();

      setTimeout(() => {
        spy.called.should.equal.true;
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, {
          data: scrollData.slice(1, 6),
          total: scrollData.length,
        }, 'LOAD_SCROLL_ITEMS');
        done();
      }, 1500);
    });

    /**
     * @test {ExampleAction#loadScrollItems}
     */
    it('should be able to change parameters', (done) => {
      const spy = sinon.spy();
      mockStoreEvent(ExampleAction, 'LOAD_SCROLL_ITEMS', spy);
      ExampleAction.loadScrollItems(3, 6);
      setTimeout(() => {
        spy.called.should.equal.true;
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, {
          data: scrollData.slice(3, 9),
          total: scrollData.length,
        }, 'LOAD_SCROLL_ITEMS');
        done();
      }, 1500);
    });
  });
});
