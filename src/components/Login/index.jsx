import React from 'react';
import {BaseComponent} from 'frill-core';

/**
 * Login component
 * @extends {FrillCore.BaseComponent}
 * @example <caption>Usage in React-Router</caption>
 * <Route name="login" path="/login" handler={LoginComponent} />
 */
class LoginComponent extends BaseComponent {
  /**
   * Constructor
   * @param {any} props
   */
  constructor(props) {
    super(props);

    this._bind([
      'onClick',
    ]);
  }

  /**
   * Click handler
   */
  onClick(e) {
    e.preventDefault();
    console.log('btn clicked!');
  }

  /**
   * render
   * @return {React DOM}
   * @see https://facebook.github.io/react/docs/component-specs.html#render
   */
  render() {
    return (
      <div className="Login">
        <h2>Login Sample</h2>
        <form>
          <p className="form-item">
            <input type="text" ref="username" placeholder="username" />
          </p>
          <p className="form-item">
            <input type="password" ref="password" placeholder="password" />
          </p>
          <p className="form-item">
            <button onClick={this.onClick}>login</button>
          </p>
        </form>
      </div>
    );
  }
}

/**
 * Export LoginComponent
 */
export default LoginComponent;
