import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { updatePost, fetchSelectedPost } from '../../store/posts/post-actions';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const UpdatePost: React.FC = () => {
  const classes = useStyles();
  const { post_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.posts.selected_post);
  const [title, setTitle] = useState(selectedPost.title);
  const [content, setContent] = useState(selectedPost.content);
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [category3, setCategory3] = useState('');

  useEffect(() => {
    dispatch(fetchSelectedPost(parseInt(post_id as string)));
  }, [dispatch, post_id]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const categories = [category1, category2, category3].filter((category) => category.length > 0);

    dispatch(updatePost(parseInt(post_id as string), title, content, selectedPost.user_id, categories));
    navigate('/');
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={4}
      />
      <br />
      <TextField
        label="Category 1"
        value={category1}
        onChange={(e) => setCategory1(e.target.value)}
      />
      <br />
      <TextField
        label="Category 2"
        value={category2}
        onChange={(e) => setCategory2(e.target.value)}
      />
      <br />
      <TextField
        label="Category 3"
        value={category3}
        onChange={(e) => setCategory3(e.target.value)}
      />
      <br />
      <input type="hidden" value={post_id} />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Update
      </Button>
    </form>
  );
};

export default UpdatePost;

