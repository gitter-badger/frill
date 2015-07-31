'use strict';

// import Frill from 'frill';
import React from 'react';
import {Link, RouteHandler} from 'react-router';

export default React.createClass({
  name: "App",
  render: function() {
    return (
      <div>
        <h1><Link to="app">Back to top</Link></h1>
        <Link to="toptwo">トップ2へ</Link>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
