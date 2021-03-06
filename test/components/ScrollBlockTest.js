import {createSandboxSpy} from '../baseHelper';
import ScrollBlock from '../../src/components/ScrollBlock/index.jsx';
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
    spy = createSandboxSpy(ScrollBlock.prototype, [
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
   * @test {ScrollBlockComponent#constructor}
   */
  it('should be an instance of React.Component', () => {
    mountComponent(0);
    TestUtils.isCompositeComponent(scrollBlock).should.be.true;
  });
  /**
   * @test {ScrollBlockComponent#constructor}
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
   * @test {ScrollBlockComponent#componentDidMount}
   */
  describe('ScrollBlockComponent#componentDidMount', () => {
    /**
     * @test {ScrollBlockComponent#componentDidMount}
     */
    it('should have been called', () => {
      mountComponent(0);
      sinon.assert.calledOnce(spy.componentDidMount);
    });
    /**
     * @test {ScrollBlockComponent#componentDidMount}
     */
    it('should fetch data when none are loaded', () => {
      mountComponent(0);

      scrollBlock.props.itemsCount.should.equal(1);
      // or
      spy.componentDidMount.getCall(0)
        .thisValue.props.itemsCount.should.equal(1);
    });
    /**
     * @test {ScrollBlockComponent#componentDidMount}
     */
    it('should not fetch data when some are already loaded', () => {
      mountComponent(3);

      scrollBlock.props.itemsCount.should.equal(3);
      // or
      spy.componentDidMount.getCall(0)
        .thisValue.props.itemsCount.should.equal(3);
    });
  });

  /**
   * @test {ScrollBlockComponent#componentWillReceiveProps}
   */
  describe('ScrollBlockComponent#componentWillReceiveProps', () => {
    /**
     * @test {ScrollBlockComponent#componentWillReceiveProps}
     */
    it('should have been called', () => {
      mountComponent(0);
      sinon.assert.calledOnce(spy.componentWillReceiveProps);
    });
    /**
     * @test {ScrollBlockComponent#componentWillReceiveProps}
     */
    it('should set isLoading state to false when props has new children', () => {
      mountComponent(0);
      spy.componentWillReceiveProps.getCall(0).args[0].children.should.exist;
      spy.setState.getCall(1).calledWith({isLoading: false});
    });
  });

  /**
   * @test {ScrollBlockComponent#componentWillUnmount}
   */
  describe('ScrollBlockComponent#componentWillUnmount', () => {
    /**
     * @test {ScrollBlockComponent#componentWillUnmount}
     */
    it('should have been called', () => {
      mountComponent(0);
      unmountComponent();
      sinon.assert.calledOnce(spy.componentWillUnmount);
    });
  });

  /**
   * @test {ScrollBlockComponent#onScroll}
   */
  describe('ScrollBlockComponent#onScroll', () => {
    scrollEvt = document.createEvent('Events');
    scrollEvt.initEvent('scroll', false, false);
    /**
     * @test {ScrollBlockComponent#onScroll}
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
     * @test {ScrollBlockComponent#onScroll}
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
    /**
     * @test {ScrollBlockComponent#onScroll}
     */
    it('should not load the data when all data are loaded', () => {
      mountComponent(10);
      const elem = React.findDOMNode(scrollBlock);
      elem.scrollHeight = 100 * scrollBlock.props.itemsCount;
      elem.clientHeight = 200;
      dispatchScrollEvent(elem, elem.scrollHeight - elem.clientHeight);
      sinon.assert.called(spy.onScroll);
      sinon.assert.notCalled(spy.fetchData);
      scrollBlock.props.itemsCount.should.equal(10);
    });
  });

  /**
   * @test {ScrollBlockComponent#render}
   */
  describe('ScrollBlockComponent#render', () => {
    /**
     * @test {ScrollBlockComponent#render}
     */
    it('should have a className \'ScrollBlock\'', () => {
      mountComponent(0);
      React.findDOMNode(scrollBlock).className.should.equal('ScrollBlock');
    });
  });

  /**
   * @test {ScrollBlockComponent#fetchData}
   */
  describe('ScrollBlockComponent#fetchData', () => {
    /**
     * @test {ScrollBlockComponent#fetchData}
     */
    it('should set isLoading state to true', () => {
      mountComponent(0);
      sinon.assert.calledOnce(spy.fetchData);
      spy.setState.getCall(0).calledWith({isLoading: true});
    });
  });
});
