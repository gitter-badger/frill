import React from 'react';
import {StoreWatchComponent} from '../../bootstrap';

class Login extends new StoreWatchComponent(['Test']) {
  constructor(props) {
    super(props);

    this._bind([
      'onClickTest',
    ]);
  }

  onClickTest(evt) {
    evt.preventDefault();
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
            <button onClick={this.onClickTest}>login</button>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
