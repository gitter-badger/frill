import React from 'react';

export default class ScrollBlock extends React.Component {
  constructor() {
    super();
    this.name = 'ScrollBlock';

    this.state = {
      isLoading: false,
      isAllLoaded: false,
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    this.props.fetchData();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.children) {
      this.setState({
        isLoading: false,
      });
    }
  }

  onScroll() {
    if (!this.state.isLoading && !this.state.isAllLoaded) {
      const _elem = React.findDOMNode(this.refs.scrollBlock);

      if (_elem.scrollHeight - _elem.scrollTop === _elem.clientHeight) {
        this.setState({
          isLoading: true,
        });

        this.props.fetchData();
      }
    }
  }

  render() {
    const style = {
      opacity: Number(this.state.isLoading),
    };

    return (
      <div>
        <div className="ScrollBlock" onScroll={this.onScroll} ref="scrollBlock">
          {this.props.children}
          <p style={style}>
            loading ...
          </p>
        </div>
      </div>
    );
  }
}
ScrollBlock.propTypes = {
  onScrolledToBottom: React.PropTypes.func,
  retrieve: React.PropTypes.number,
};
