import '../specHelper';
import {mockDispatch} from '../frillHelper';
import ExampleStore from '../../src/stores/Example';
import {BaseStore} from 'frill-core';
import scrollData from '../../src/helpers/testScrollItemsData';

/**
 * ExampleStore
 * @test {ExampleStore}
 */
describe('ExampleStore', () => {
  /**
   * @test {ExampleStore#constructor}
   */
  it('should be an instance of FrillCore.BaseStore', () => {
    (ExampleStore instanceof BaseStore).should.be.true;
  });

  /**
   * @test {ExampleStore#constructor}
   */
  it('should have appropriate properties and defaults', () => {
    ExampleStore._count.should.equal(0);
    ExampleStore._scrollItems.should.be.an.instanceof(Array);
    ExampleStore._scrollItems.should.be.empty;
    ExampleStore._scrollItemsCount.should.equal(0);
    ExampleStore._scrollItemTotal.should.equal(0);
  });

  /**
   * @test {ExampleStore#actions}
   */
  describe('ExampleStore#actions', () => {
    /**
     * @test {ExampleStore#actions}
     */
    it('should handle COUNT_UP', () => {
      ExampleStore._actions.COUNT_UP.should.exist;
    });

    /**
     * @test {ExampleStore#actions}
     */
    it('should handle COUNT_UP_BY', () => {
      ExampleStore._actions.COUNT_UP_BY.should.exist;
    });

    /**
     * @test {ExampleStore#actions}
     */
    it('should handle LOAD_SCROLL_ITEMS', () => {
      ExampleStore._actions.LOAD_SCROLL_ITEMS.should.exist;
    });
  });
  /**
   * @test {ExampleStore#countUp}
   */
  describe('ExampleStore#countUp', () => {
    /**
     * @test {ExampleStore#countUp}
     */
    it('should have a countUp() method', () => {
      ExampleStore.countUp.should.be.a('function');
    });

    /**
     * @test {ExampleStore#countUp}
     * @test {ExampleStore#count}
     */
    it('should be able to handle dispatched actions', () => {
      // Check params through 'Getter' methods
      ExampleStore.count.should.equal(0);
      mockDispatch(ExampleStore, 'COUNT_UP');
      ExampleStore.count.should.equal(1);
      mockDispatch(ExampleStore, 'COUNT_UP');
      ExampleStore.count.should.equal(2);
    });
  });

  /**
   * @test {ExampleStore#countUpBy}
   */
  describe('ExampleStore#countUpBy', () => {
    /**
     * @test {ExampleStore#countUpBy}
     */
    it('should have a countUpBy() method', () => {
      ExampleStore.countUpBy.should.be.a('function');
    });

    /**
     * @test {ExampleStore#countUpBy}
     * @test {ExampleStore#count}
     */
    it('should be able to handle dispatched actions', () => {
      // Check params through 'Getter' methods
      ExampleStore.count.should.equal(2);
      mockDispatch(ExampleStore, 'COUNT_UP_BY', 1);
      ExampleStore.count.should.equal(3);
      mockDispatch(ExampleStore, 'COUNT_UP_BY', 10);
      ExampleStore.count.should.equal(13);
    });
  });

  /**
   * @test {ExampleStore#loadScrollItems}
   */
  describe('ExampleStore#loadScrollItems', () => {
    /**
     * @test {ExampleStore#loadScrollItems}
     */
    it('should have a loadScrollItems() method', () => {
      ExampleStore.countUpBy.should.be.a('function');
    });

    /**
     * @test {ExampleStore#loadScrollItems}
     * @test {ExampleStore#scrollItems}
     * @test {ExampleStore#scrollItemsCount}
     * @test {ExampleStore#scrollItemTotal}
     */
    it('should be able to handle dispatched actions', () => {
      // Check params through 'Getter' methods
      ExampleStore.scrollItems.should.be.an.instanceof(Array);
      ExampleStore.scrollItems.should.be.empty;
      ExampleStore.scrollItemsCount.should.equal(0);
      ExampleStore.scrollItemTotal.should.equal(0);

      const data = scrollData.slice(1, 6);
      mockDispatch(ExampleStore, 'LOAD_SCROLL_ITEMS', {
        data: data,
        total: scrollData.length,
      });

      ExampleStore.scrollItems.should.be.an.instanceof(Array);
      ExampleStore.scrollItems.length.should.equal(data.length);
      ExampleStore.scrollItemsCount.should.equal(data.length);
      ExampleStore.scrollItemTotal.should.equal(scrollData.length);

      const data2 = scrollData.slice(6, 8);
      mockDispatch(ExampleStore, 'LOAD_SCROLL_ITEMS', {
        data: data2,
        total: scrollData.length,
      });

      ExampleStore.scrollItems.should.be.an.instanceof(Array);
      ExampleStore.scrollItems.length.should.equal(data.length + data2.length);
      ExampleStore.scrollItemsCount.should.equal(data.length + data2.length);
      ExampleStore.scrollItemTotal.should.equal(scrollData.length);
    });
  });
});
