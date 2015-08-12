import React from 'react/addons';
import ScrollBlock from '../../src/components/ScrollBlock/index.jsx';
const TestUtils = React.addons.TestUtils;

let spy;
let container;
let scrollBlock;

class TestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsCount: this.props.itemsCount,
    };
  }

  onFetchData() {
    this.setState({
      itemsCount: this.state.itemsCount + 1,
    });
  }

  render() {
    const items = [];
    let count = 0;

    while (items.length < this.state.itemsCount) {
      items.push(<li key={count}>a</li>);
      count = count + 1;
    }

    return (
      <ScrollBlock
        fetchData={this.onFetchData.bind(this)}
        itemsCount={this.state.itemsCount}
        itemTotal={10}>
          {(() => {
            React.renderToString(<ul>{items}</ul>);
          })()}
      </ScrollBlock>
    );
  }
}

function render(itemsCount) {
  container = TestUtils
    .renderIntoDocument(<TestComponent itemsCount={itemsCount} />);

  scrollBlock = TestUtils
    .findRenderedComponentWithType(container, ScrollBlock);
}

function createSpy(component, methods) {
  const _spy = {};
  methods.map((method) => {
    _spy[method] = sandbox.spy(component, method);
  });
  return _spy;
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
      'render',
    ]);

    render(0);
  });

  /**
   * @test {ExampleStore#constructor}
   */
  it('should be an instance of React.Component', () => {
    TestUtils.isCompositeComponent(scrollBlock).should.be.true;
  });
  /**
   * @test {ExampleStore#constructor}
   */
  it('should have appropriate state and props', () => {
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
      sinon.assert.calledOnce(spy.componentDidMount);
    });

    it('should fetch data when none are already loaded', () => {
      spy.componentDidMount.getCall(0)
        .thisValue.props.itemsCount.should.equal(1);

      render(3);
      spy.componentDidMount.getCall(1)
        .thisValue.props.itemsCount.should.equal(3);
    });
  });

  /**
   * @test {ExampleStore#componentDidMount}
   */
  describe('ScrollBlockComponent#componentWillReceiveProps', () => {
    /**
     * @test {ExampleStore#componentDidMount}
     */
    it('should have been called', () => {
      sinon.assert.calledOnce(spy.componentWillReceiveProps);
    });
  });
});
