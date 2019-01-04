import React from 'react';

import { storiesOf } from '@storybook/react';
import { Post } from '../src/components/Post';

storiesOf('Post', module)
  .add('with post one', () => {
    return <Post
      post={{
        title: "Post One",
        content: "Post One Content",
        author: "Kevin"
      }}
    />
  })
  .add('with post two', () => {
    return <Post
      post={{
        title: "Post Two with a much longer title",
        content: "Post Two Content",
        author: "Kevin"
      }}
    />
  });
