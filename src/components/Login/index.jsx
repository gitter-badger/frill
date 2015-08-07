import React from 'react';

export default class Login extends React.Component {
  constructor() {
    super();
    this.name = 'Login';
  }

  render() {
    return (
      <div className="Login">
        <h2>Login Sample</h2>
        <form>
          <p className="form-item">
            <input type="text" ref="username" placeholder="ユーザー名" />
          </p>
          <p className="form-item">
            <input type="password" ref="password" placeholder="パスワード" />
          </p>
          <p className="form-item">
            <button>login</button>
          </p>
        </form>
      </div>
    );
  }
}
