import React from 'react';
import {Link, RouteHandler} from 'react-router';

class App extends React.Component {

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
            <li><Link to="login">Login Sample</Link></li>
            <li>
              <a href="http://localhost:3000/auth/twitter/login">
                Twitter Auth Test
              </a>
            </li>
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

export default App;
