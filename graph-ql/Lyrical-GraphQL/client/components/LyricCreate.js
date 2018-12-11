import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import fetchSong from '../queries/fetchSong';
import addLyric from '../queries/addLyric';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { songId } = this.props;

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: songId
      },
      // refetchQueries: [{ query: fetchSong, options: { variables: { id: songId } } } ] //handled by apollo client
    });

    this.setState({ content: '' });
  }

  render() {
    const { content } = this.state;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="title">Add a lyric:</label>
        <input 
          id="title"
          type="text" 
          value={content}
          onChange={(e) => this.setState({ content: e.target.value })} 
        />
      </form>
    );
  }
}

export default graphql(addLyric)(LyricCreate);
