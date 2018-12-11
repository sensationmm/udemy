import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import likeLyric from '../queries/likeLyric';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  render() {
    const { lyrics } = this.props;

    return (
      <ul className="collection">
      {
        lyrics.map(({ id, content, likes }) => {
          return (
            <li key={`lyric-${id}`} className="collection-item">
              {content}

              <span className="vote-box">
                <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>

                {likes}
              </span>
            </li>
          )
        })
      }
      </ul>
    )
  }
}

export default graphql(likeLyric)(LyricList);
