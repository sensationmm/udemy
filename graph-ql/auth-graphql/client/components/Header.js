import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import CurrentUserQuery from '../queries/CurrentUser';
import LogoutMutation from '../mutations/Logout';

class Header extends Component {
  onLogout() {
    this.props.mutate({
      refetchQueries: [{ query: CurrentUserQuery }]
    });
  }

  renderButtons() {
    const { loading, currentUser } = this.props.data;

    if(!loading) {
      if(currentUser) {
        return (
          <li><a onClick={this.onLogout.bind(this)}>Logout</a></li>
        )
      } else {
        return (
          <div>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </div>
        )
      }
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Home</Link>

          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    )
  }
}

export default graphql(LogoutMutation)(
  graphql(CurrentUserQuery)(Header)
);
