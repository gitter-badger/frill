import React from 'react';
import {StoreWatchComponent} from 'frill-core';
import {Link, RouteHandler} from 'react-router';

/**
 * App component
 * @extends {FrillCore.StoreWatchComponent}
 * @example <caption>Usage in React-Router</caption>
 * <Route name="app" path="/" handler={AppComponent} />
 */
class AppComponent extends new StoreWatchComponent(['Auth']) {

  /**
   * Constructor
   * @param {any} props
   */
  constructor(props) {
    super(props);

    /**
     * Name of component
     */
    this.name = 'App';
  }

  getStateFromFrill() {
    return {
      isLoggedIn: this.getFrill().store('Auth').isLoggedIn(),
      user: this.getFrill().store('Auth').user,
    };
  }

  /**
   * render
   * @return {React DOM}
   * @see https://facebook.github.io/react/docs/component-specs.html#render
   */
  render() {
    const isLoggedIn = this.state.isLoggedIn;
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
        {(isLoggedIn ? () => {
          return (
            <p className="welcome">Hello, {this.state.user.user.displayName}</p>
          );
        } : () => {
          return (
            <p className="welcome">Welcome, Guest</p>
          );
        })()}
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
