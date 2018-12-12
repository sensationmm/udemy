import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    const { email, password } = this.state;
    const { onSubmit, errors } = this.props;

    return (
      <div className="row">
        <div className="col s6">
          <div className="input-field">
            <input 
              type="text" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          <div className="input-field">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          <div className="errors">
          {
            errors.length > 0 && errors.map((error, count) => {
              return <div key={`error-${count}`}>{error}</div>
            })
          }
          </div>

          <button className="btn" onClick={() => onSubmit({ email, password })}>Submit</button>
        </div>
      </div>
    )
  }
}

export default AuthForm;