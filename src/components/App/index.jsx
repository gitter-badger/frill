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
            <li><Link to="top">Top page</Link></li>
            <li><Link to="another">Another page</Link></li>
          </ul>
        </nav>
        <RouteHandler {...this.props}/>
        <footer>
          <p>FrillJS</p>
        </footer>
      </div>
    );
  }
}
