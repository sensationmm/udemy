import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

import { createPaginationContainer, graphql } from 'react-relay';

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const user = localStorage.getItem('User');
    if(user) {
      this.setState({ user: JSON.parse(user) })
    }
  }

  loadMore() {
    if(!this.props.relay.hasMore()) {
      console.log('Nothing more to load');
      return;
    } else if(this.props.relay.isLoading()) {
      console.log('Request is already pending');
      return;
    }

    this.props.relay.loadMore(3);
  }

  render() {
    const { user } = this.state;
    const { viewer } = this.props;

    return (
      <div style={styles.listPageWrapper}>
        <Link to="/create-post" style={styles.buttonWrapper}>+ New Post</Link>

        { !user 
          ? <Link to="/login" style={styles.buttonWrapper}>Login</Link>
          : <div style={styles.buttonWrapper} onClick={() => {
              localStorage.removeItem('User')
              window.location.reload();
            }}>Logout</div>
        }

        <div style={{ marginTop: 20 }}>
          {
            viewer.allPosts.edges.map(({node}) => {
              return <Post key={node.__id} post={node} />
            })
          }
        </div>

        <button style={styles.buttonWrapper} onClick={() => this.loadMore()}>Load More</button>
      </div>
    )
  }
}

const styles = {
  listPageWrapper: { marginTop:20, textAlign: "center" },
  buttonWrapper: {
    display: 'inline',
    padding: 10,
    background: "white",
    border: "2px solid indianred",
    color: "indianred",
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

export default createPaginationContainer(
  ListPage,
  graphql`
    fragment ListPage_viewer on Viewer {
      allPosts(first: $count, after: $after, order: "DESC")@connection(key: "ListPage_allPosts", filters: []) {
        edges {
          node {
            ...Post_post
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
  {
    direction: 'forward',
    query: graphql`
      query ListPageForwardQuery($count: Int!, $after: String) {
        viewer {
          ...ListPage_viewer
        }
      }
    `,
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.allPosts;
    },
    getFragmentVariables(previousVariables, totalCount) {
      return {
        ...previousVariables,
        count: totalCount
      }
    },
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        count: paginationInfo.count,
        after: paginationInfo.cursor
      }
    }
  }
);
