import React from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

/**
 * ScrollBlock component for infinite scrolling
 * @extends {React.Component}
 * @example <caption>Usage in React component</caption>
 * import ScrollBlock from 'ScrollBlock';
 * ...
 * render() {
 *   return (
 *     <ScrollBlock
 *       fetchData={this.onLoadScrollItems}
 *       itemsCount={this.state.scrollItemsCount}
 *       itemTotal={this.state.scrollItemTotal}>
 *       <ul className="scroll-list">
 *         {items}
 *       </ul>
 *     </ScrollBlock>
 *   );
 * }
 */
class ScrollBlockComponent extends React.Component {
  /**
   * Constructor
   * @param {any} props
   */
  constructor(props) {
    super(props);

    /**
     * Name of component
     */
    this.name = 'ScrollBlock';

    /**
     * State of component
     */
    this.state = {
      isLoading: false,
      // NOTE: changed from 'isAllLoaded'
      isLoadedAll: false,
    };
  }

  /**
   * componentDidMount
   * @see https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
   */
  componentDidMount() {
    if (canUseDOM) {
      React.findDOMNode(this.refs.scrollBlock)
        .addEventListener('scroll', this.onScroll.bind(this));
    }

    if (!this.props.itemsCount) {
      this.setState({
        isLoading: true,
      });

      this.props.fetchData();
    }
  }

  /**
   * componentWillReceiveProps
   * @see https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
   */
  componentWillReceiveProps(newProps) {
    if (newProps.children) {
      this.setState({
        isLoading: false,
      });
    }
  }

  /**
   * componentWillUnmount
   * @see https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount
   */
  componentWillUnmount() {
    React.findDOMNode(this.refs.scrollBlock)
      .removeEventListener('scroll', this.onScroll);
  }

  /**
   * Scroll handler
   */
  onScroll() {
    if (!this.state.isLoading && !this.state.isLoadedAll) {
      const _elem = React.findDOMNode(this.refs.scrollBlock);
      const _scrolled = Math.round(_elem.scrollHeight - _elem.scrollTop);

      if (_scrolled - _elem.clientHeight >= -1
        && _scrolled - _elem.clientHeight <= 1) {
        // if items are all loaded
        if (this.props.itemTotal &&
          (this.props.itemTotal === this.props.itemsCount)) {
          this.setState({
            isLoading: true,
            isLoadedAll: true,
          });

        // else if there are more items to load
        } else {
          this.setState({
            isLoading: true,
          });
          this.props.fetchData();
        }
      }
    }
  }

  /**
   * render
   * @return {React DOM}
   * @see https://facebook.github.io/react/docs/component-specs.html#render
   */
  render() {
    const _className = this.state.isLoading ? ' is-loading' : '';
    const isLoadedAll = this.state.isLoadedAll;

    return (
      <div>
        <div className="ScrollBlock" ref="scrollBlock">
          {this.props.children}
          <p className={`ScrollBlock-loading${_className}`}>
            {(!isLoadedAll ? () => {
              // return 'loading...' when there are more items to load
              return 'loading ...';
            } : () => {
              // when all items loaded
              return 'loaded!';
            })()}
          </p>
        </div>
      </div>
    );
  }
}

/**
 * PropTypes
 */
ScrollBlockComponent.propTypes = {
  // function to fetch new items
  fetchData: React.PropTypes.func,
  // Count of loaded items
  itemsCount: React.PropTypes.number,
  // Count of total items
  itemTotal: React.PropTypes.number,
};

/**
 * Export ScrollBlockComponent
 */
export default ScrollBlockComponent;
