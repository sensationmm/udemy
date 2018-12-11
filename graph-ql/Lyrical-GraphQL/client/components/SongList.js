import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';

class SongList extends Component {
  onSongDelete(songId) {
    this.props.mutate({
      variables: {
        id: songId
      }
    }).then(() => {
      this.props.data.refetch() //recalls queries in component scope
    });
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      const { id, title } = song;

      return (
        <li key={`song-${id}`} className="collection-item">
          {title}
          <i 
            className="material-icons" 
            onClick={() => this.onSongDelete(id)}
          >delete</i>
        </li>
      )
    });
  }

  render() {
    if(this.props.data.loading) { return <div>Loading...</div> }

    return (
      <div>
        <h3>My Songs</h3>

        <ul className="collection">{ this.renderSongs() }</ul>

        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

export default graphql(deleteSong)(
  graphql(fetchSongs)(SongList)
);
