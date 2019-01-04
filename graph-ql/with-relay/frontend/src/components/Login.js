import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import LoginUserMutation from '../mutations/LoginUserMutation';
import CreateUserMutation from '../mutations/CreateUserMutation';

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      login: true,
      username: '',
      password: '',
      fullname: '',
    };
  }

  confirm = () => {
    const { login, username, password, fullname } = this.state;

    if(login) {
      LoginUserMutation(username, password, user => {
        localStorage.setItem('User', JSON.stringify(user));
        this.props.history.push('/');
      });
    } else {
      CreateUserMutation(username, password, fullname, user => {
        localStorage.setItem('User', JSON.stringify(user));
        this.props.history.push('/');
      });
    }
  }

  render() {
    const { login, username, password, fullname } = this.state;

    return (
      <div style={styles.loginWrapper}>
        <h4>{login ? 'Login' : 'Sign Up'}</h4>
        <div>
           <input
            style={styles.inputText}
            value={username}
            placeholder="Username"
            onChange={e => this.setState({ username: e.target.value })}
          />

          <input
            style={styles.inputText}
            value={password}
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />

          {!login &&
            <input
              style={styles.inputText}
              value={fullname}
              placeholder="Full Name"
              onChange={e => this.setState({ fullname: e.target.value })}
            />
          }
        </div>

        <div>
          <button style={styles.inputButton} onClick={() => this.confirm()}>
            {login ? 'Log In' : 'Sign Up'}
          </button>

          <button style={styles.inputButton} onClick={() => this.setState({ login: !login })}>
            {login ? 'Create an account' : 'Already have an account?'}
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  loginWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputText: {
    display: 'block',
    fontSize: '20px',
    marginBottom: '10px'
  },
  inputButton: {
    padding: 10,
    border: '2px solid indianred',
    borderRadius: 6,
    background: 'white',
    color: 'indianred',
    margin: '5px'
  }
};

export default withRouter(Login);
