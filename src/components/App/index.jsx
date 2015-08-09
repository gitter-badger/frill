import React from 'react';
import {Link, RouteHandler} from 'react-router';

/**
 * App component
 * @extends {React.Component}
 * @example <caption>Usage in React-Router</caption>
 * <Route name="app" path="/" handler={App} />
 */
class AppComponent extends React.Component {

  /**
   * Constructor
   * @param {any} props - props for components
   */
  constructor(props) {
    super(props);

    /**
     * Name of component
     */
    this.name = 'App';
  }

  /**
   * Renders the App
   * @return {React DOM}
   */
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

/**
 * Export AppComponent
 */
export default AppComponent;
