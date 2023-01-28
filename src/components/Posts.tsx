import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import postSlice from '../store/posts/postSlice';
import { fetchPosts } from '../store/posts/post-actions';

export const postActions = postSlice.actions;

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
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const allPosts = useAppSelector(state => state.posts.all_posts);
  const filteredPosts = useAppSelector(state => state.posts.filtered_posts);

  useEffect(() => {
    dispatch(fetchPosts());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (allPosts.length > 0) {
      dispatch(postActions.setFilteredPosts(allPosts));
    }
  }, [allPosts, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to={`/posts/new`}>Create Post</Link>
      {filteredPosts.map(post => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <Card className={classes.post}>
            <CardHeader title={post.title} subheader={`by ${post.creator}`} />
            <CardContent>
              <div className={classes.upvotes}>
                <Typography>{post.upvotes}</Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Posts;