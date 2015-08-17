// import React from 'react/addons';
import ScrollBlock from '../../src/components/ScrollBlock/index.jsx';
const TestUtils = React.addons.TestUtils;
import ExeEnv from 'react/lib/ExecutionEnvironment';
ExeEnv.canUseDOM = true;

let spy;
let container;
let mockParent;
let scrollBlock;
let scrollEvt;

class MockParent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsCount: this.props.itemsCount,
    };
  }

  onFetchData(retrieve) {
    const add = retrieve || 1;
    this.setState({
      itemsCount: this.state.itemsCount + add,
    });
  }

  render() {
    const items = [];
    let count = 0;

    while (items.length < this.state.itemsCount) {
      items.push(<li key={count}>a</li>);
      count = count + 1;
    }

    const list = React.renderToString(<ul ref="list">{items}</ul>);

    return (
      <ScrollBlock
        fetchData={this.onFetchData.bind(this)}
        itemsCount={this.state.itemsCount}
        itemTotal={10}>
          {list}
      </ScrollBlock>
    );
  }
}

function mountComponent(itemsCount) {
  // container = TestUtils
  //   .renderIntoDocument(<TestComponent itemsCount={itemsCount} />);

  container = document.createElement('div');
  document.body.appendChild(container);

  mockParent = React.render(<MockParent itemsCount={itemsCount} />, container);

  scrollBlock = TestUtils
    .findRenderedComponentWithType(mockParent, ScrollBlock);
}

function unmountComponent() {
  if (container) {
    React.unmountComponentAtNode(container);
  }
}

function createSpy(component, methods) {
  const _spy = {};
  methods.map((method) => {
    _spy[method] = sandbox.spy(component, method);
  });
  return _spy;
}

function dispatchScrollEvent(target, scrollTop) {
  target.scrollTop = scrollTop;
  target.dispatchEvent(scrollEvt);
}

/**
 * ScrollBlockComponent
 * @test {ScrollBlockComponent}
 */
describe('ScrollBlockComponent', () => {
  beforeEach(() => {
    spy = createSpy(ScrollBlock.prototype, [
      'componentDidMount',
      'componentWillReceiveProps',
      'componentWillUnmount',
      'onScroll',
      'render',
      'fetchData',
      'setState',
    ]);
  });

  afterEach(() => {
    unmountComponent();
  });

  /**
   * @test {ExampleStore#constructor}
   */
  it('should be an instance of React.Component', () => {
    mountComponent(0);
    TestUtils.isCompositeComponent(scrollBlock).should.be.true;
  });
  /**
   * @test {ExampleStore#constructor}
   */
  it('should have appropriate state and props', () => {
    mountComponent(0);
    scrollBlock.state.isLoading.should.exist;
    scrollBlock.state.isLoadedAll.should.exist;
    scrollBlock.props.fetchData.should.be.a('function');
    scrollBlock.props.itemsCount.should.be.a('number');
    scrollBlock.props.itemTotal.should.be.a('number');
  });

  /**
   * @test {ExampleStore#componentDidMount}
   */
  describe('ScrollBlockComponent#componentDidMount', () => {
    /**
     * @test {ExampleStore#componentDidMount}
     */
    it('should have been called', () => {
      mountComponent(0);
      sinon.assert.calledOnce(spy.componentDidMount);
    });

    it('should fetch data when none are loaded', () => {
      mountComponent(0);

      scrollBlock.props.itemsCount.should.equal(1);
      // or
      spy.componentDidMount.getCall(0)
        .thisValue.props.itemsCount.should.equal(1);
    });

    it('should not fetch data when some are already loaded', () => {
      mountComponent(3);

      scrollBlock.props.itemsCount.should.equal(3);
      // or
      spy.componentDidMount.getCall(0)
        .thisValue.props.itemsCount.should.equal(3);
    });
  });

  /**
   * @test {ExampleStore#componentWillReceiveProps}
   */
  describe('ScrollBlockComponent#componentWillReceiveProps', () => {
    /**
     * @test {ExampleStore#componentWillReceiveProps}
     */
    it('should have been called', () => {
      mountComponent(0);
      sinon.assert.calledOnce(spy.componentWillReceiveProps);
    });
    /**
     * @test {ExampleStore#componentWillReceiveProps}
     */
    it('should set isLoading state to false when props have new children', () => {
      mountComponent(0);
      spy.componentWillReceiveProps.getCall(0).args[0].children.should.exist;
      spy.setState.getCall(1).calledWith({isLoading: false});
    });
  });

  /**
   * @test {ExampleStore#componentWillUnmount}
   */
  describe('ScrollBlockComponent#componentWillUnmount', () => {
    /**
     * @test {ExampleStore#componentWillUnmount}
     */
    it('should have been called', () => {
      mountComponent(0);
      unmountComponent();
      sinon.assert.calledOnce(spy.componentWillUnmount);
    });
  });

  /**
   * @test {ExampleStore#onScroll}
   */
  describe('ScrollBlockComponent#onScroll', () => {
    scrollEvt = document.createEvent('Events');
    scrollEvt.initEvent('scroll', false, false);
    /**
     * @test {ExampleStore#onScroll}
     */
    it('should load the data when the scrollbar reaches the end', () => {
      mountComponent(6);
      const elem = React.findDOMNode(scrollBlock);
      elem.scrollHeight = 100 * scrollBlock.props.itemsCount;
      elem.clientHeight = 200;
      dispatchScrollEvent(elem, elem.scrollHeight - elem.clientHeight);
      sinon.assert.called(spy.onScroll);
      scrollBlock.props.itemsCount.should.equal(7);
    });
    /**
     * @test {ExampleStore#onScroll}
     */
    it('should not load the data when the scrollbar is not at the end', () => {
      mountComponent(6);
      const elem = React.findDOMNode(scrollBlock);
      elem.scrollHeight = 100 * scrollBlock.props.itemsCount;
      elem.clientHeight = 200;
      dispatchScrollEvent(elem, 200);
      sinon.assert.called(spy.onScroll);
      scrollBlock.props.itemsCount.should.equal(6);
    });
  });

  /**
   * @test {ExampleStore#fetchData}
   */
  describe('ScrollBlockComponent#fetchData', () => {
    /**
     * @test {ExampleStore#fetchData}
     */
    it('should set isLoading state to true', () => {
      mountComponent(0);
      sinon.assert.calledOnce(spy.fetchData);
      spy.setState.getCall(0).calledWith({isLoading: true});
    });
  });
});
