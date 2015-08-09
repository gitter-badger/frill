import React from 'react';
import {BaseComponent} from 'frill-core';

class LoginComponent extends BaseComponent {
  constructor(props) {
    super(props);

    this._bind([
      'onClick',
    ]);
  }

  onClick(e) {
    e.preventDefault();
    console.log('btn clicked!');
  }

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

export default LoginComponent;
