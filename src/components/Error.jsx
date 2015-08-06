import React from 'react';
import {BaseComponent} from 'frill-core';

class Error extends BaseComponent {
    constructor(props) {
      super(props);
      this.name = 'Error';
    }
    render() {
      const status = this.props.status;
      return (
        <div>
          <a href="/">Back to top</a>
          <div>CODE: {status.statusCode}</div>
          <div>ERROR: {status.error}</div>
          <div>MESSAGE: {status.message}</div>
        </div>
      );
    }
}

export default Error;
