import React from 'react';
import {Link, RouteHandler} from 'react-router';

export default class App extends React.Component {

  constructor() {
    super();
    this.name = 'App';
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome to FrillJS!</h1>
        </header>
        <nav>
          <ul>
            <li><Link to="app">FrillJS</Link></li>
            <li><Link to="toptwo">トップ2へ</Link></li>
          </ul>
        </nav>
        <RouteHandler {...this.props}/>
        <footer>footer</footer>
      </div>
    );
  }
}
