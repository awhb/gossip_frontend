import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { createUser } from '../../store/user-actions';
import LoadingSpinner from '../../components/LoadingSpinner';
import Grid from '@material-ui/core/Grid';


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

const Signup: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = useAppSelector(state => state.users.current_user.id != 0);
  const isLoggedIn = auth && localStorage.hasOwnProperty("token");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoading, error, navigate]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createUser(username, password));
    if (localStorage.hasOwnProperty("token")) {
      navigate('/');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {isLoading && (<LoadingSpinner />)}
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" className={classes.button}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </Grid>  
  );
};

export default Signup;

