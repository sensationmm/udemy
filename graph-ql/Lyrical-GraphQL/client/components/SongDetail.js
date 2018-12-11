import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if(!song) {
      return null
    }

    const { id, title, lyrics } = song;

    return (
      <div>
        <Link to="/">&lt; Back to songs</Link>

        <h3>{ title }</h3>

        <LyricList lyrics={lyrics} />

        <LyricCreate songId={id} />
      </div>
    )
  }
}

export default graphql(fetchSong, { 
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);
