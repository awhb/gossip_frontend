import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  post: {
    margin: '20px 0',
  },
  upvotes: {
    display: 'inline-block',
    marginRight: '10px',
  }
});

const Posts: React.FC = () => {
  const classes = useStyles();
  const posts = useAppSelector(state => state.posts.filtered_posts);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Link to={`/posts/new`}>Create Post</Link>
      {posts.map(post => (
        <Card className={classes.post} key={post.id}>
          <CardHeader title={post.title} subheader={`by ${post.creator}`} />
          <CardContent>
            <div className={classes.upvotes}>
              <Typography>{post.upvotes}</Typography>
            </div>
            <Typography>{post.created_at.toDateString()}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Posts;

