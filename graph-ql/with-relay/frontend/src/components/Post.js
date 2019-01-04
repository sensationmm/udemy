import React, { Component } from 'react';
import Modal from 'react-modal';

import { createFragmentContainer, graphql } from 'react-relay';

class Post extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false
    };
  }

  render() {
    const { isOpen } = this.state;
    const { title, content, author } = this.props.post;

    return (
      <div style={styles.postWrapper} onClick={() => this.setState({ isOpen: !isOpen })}>
        <h3>{title}</h3>
        <Modal isOpen={isOpen}>
          {author && <div>By: {author.fullname}</div>}
          <h3>{title}</h3>
          <div>{content}</div>
          <button onClick={() => this.setState({ isOpen: false })} style={styles.closeButton}>x</button>
        </Modal>
      </div>
    );
  }
}

const styles = {
  postWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    margin: 10,
    cursor: 'pointer'
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    top: 10,
    border: 0,
    background: 'white',
    fontSize: 25,
    color: 'gray'
  }
};

export { Post };

export default createFragmentContainer(
  Post,
  graphql`
    fragment Post_post on Post {
      id
      title
      content
      author {
        fullname
      }
    }
  `
);
