import React from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

class ScrollBlock extends React.Component {
  constructor() {
    super();
    this.name = 'ScrollBlock';

    this.state = {
      isLoading: false,
      // NOTE: changed from 'isAllLoaded'
      isLoadedAll: false,
    };

    if (canUseDOM) {
      this.onScroll = this.onScroll.bind(this);
    }
  }

  componentDidMount() {
    if (!this.props.itemsCount) {
      this.setState({
        isLoading: true,
      });

      this.props.fetchData();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.children) {
      this.setState({
        isLoading: false,
      });
    }
  }

  onScroll() {
    if (!this.state.isLoading && !this.state.isLoadedAll) {
      const _elem = React.findDOMNode(this.refs.scrollBlock);

      if (_elem.scrollHeight - _elem.scrollTop - 1 === _elem.clientHeight) {
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

  render() {
    const _className = this.state.isLoading ? ' is-loading' : '';
    const isLoadedAll = this.state.isLoadedAll;

    return (
      <div>
        <div className="ScrollBlock" onScroll={this.onScroll} ref="scrollBlock">
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
ScrollBlock.propTypes = {
  fetchData: React.PropTypes.func,
  itemsCount: React.PropTypes.number,
  itemTotal: React.PropTypes.number,
};

export default ScrollBlock;
