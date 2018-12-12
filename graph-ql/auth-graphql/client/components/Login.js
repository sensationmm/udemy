import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';

import CurrentUserQuery from '../queries/CurrentUser';
import LoginMutation from '../mutations/Login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }

  componentWillUpdate(nextProps) {
    const { currentUser } = this.props;
    const nextUser = nextProps.data.currentUser;

    if(!currentUser && nextUser) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: CurrentUserQuery }]
    }).catch((res) => {
      const errors = res.graphQLErrors.map(error => error.message);
      
      this.setState({ errors });
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={errors} />
      </div>
    )
  }
}

export default graphql(LoginMutation)(
  graphql(CurrentUserQuery)(Login)
);
