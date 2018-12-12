import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import CurrentUserQuery from '../queries/CurrentUser';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentDidMount() {
      this.onAuth(this.props.data);
    }

    componentWillUpdate(nextProps) {
      this.onAuth(nextProps.data);
    }

    onAuth(props) {
      const { currentUser, loading } = props;
      console.log(currentUser, loading);

      if(!loading && !currentUser) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(CurrentUserQuery)(RequireAuth);
}
