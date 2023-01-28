import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { createComment } from '../../store/comments/comment-actions';
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

const UpdateComment: React.FC = () => {
  const classes = useStyles();
  const { post_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');

  const current_user = useAppSelector(state => state.users.current_user);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createComment(content, current_user.id, parseInt(post_id as string)));
    navigate('/');
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Create Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        fullWidth
        multiline 
      />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Update
      </Button>
    </form>
  );
};

export default UpdateComment;