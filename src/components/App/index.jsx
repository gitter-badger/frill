import React from 'react';
import {Link, RouteHandler} from 'react-router';

export default class App extends React.Component {

  constructor() {
    super();
    this.name = 'App';
  }

  render() {
    return (
      <div>
        <h1><Link to="app">Back to top</Link></h1>
        <Link to="toptwo">トップ2へ</Link>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}
