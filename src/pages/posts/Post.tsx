import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchSelectedPost, deletePost } from '../../store/posts/post-actions';
import postSlice from '../../store/posts/postSlice';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Comments from '../../components/Comments';
import { PostModel } from '../../models/redux-model';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const postActions = postSlice.actions;

const Post: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { post_id } = useParams();
    const post: PostModel = useAppSelector(state => state.posts.selected_post);
    const current_user = useAppSelector(state => state.users.current_user);
    const isCreator = post.user_id === current_user.id;

    useEffect(() => {
        dispatch(fetchSelectedPost(parseInt(post_id as string)));
    }, [dispatch, post_id]);

    useEffect(() => {
        if (post.id === 0) {
            navigate("/");
        }
        else {
            dispatch(postActions.setSelectedPost(post));
        }
    }, [post, navigate]);


    const handleDelete = () => {
        dispatch(deletePost(parseInt(post_id as string)));
        navigate("/");
    };

    return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h5">
                    {post.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {`by ${post.creator}`}
                </Typography>
                <Typography variant="body2" component="p">
                    {post.content}
                    <br />
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Button variant="contained" color="primary" component={Link} to={`/posts/${post.id}/update`}>
                  Update
                </Button>
                <Button variant="contained" color="secondary" onClick={handleDelete}>
                  Delete
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Comments />
              </Paper>
            </Grid>
          </Grid>
        </div>
    );
};


export default Post;