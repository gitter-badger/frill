import React from 'react';

export default class ScrollBlock extends React.Component {
  static get propTypes() {
    return {
      count: React.PropTypes.number,
      onScrolledToBottom: React.PropTypes.func,
    };
  }

  constructor() {
    super();
    this.name = 'ScrollBlock';

    this.state = {
      isLoading: false,
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      isLoading: false,
    });
  }

  onScroll() {
    if (!this.state.isLoading) {
      const _elem = React.findDOMNode(this.refs.scrollBlock);

      if (_elem.scrollHeight - _elem.scrollTop === _elem.clientHeight) {
        console.log('reached bottom!');

        this.setState({
          isLoading: true,
        });
      }

      this.props.onScrolledToBottom();
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.isLoading}</p>
        <div className="ScrollBlock" onScroll={this.onScroll} ref="scrollBlock">
          ああああああああ
          <br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          ああああああ
        </div>
      </div>
    );
  }
}
