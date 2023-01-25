import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { updateUser } from '../store/user-actions';
import { TextField, Button } from '@material-ui/core';
import {
  Typography,
  Paper,
  makeStyles
} from '@material-ui/core';
import { Navigate, useNavigate } from 'react-router-dom';

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

const UpdateUser: React.FC = () => {
  const classes = useStyles();
  const { user_id } = useParams();
  const current_user = useAppSelector(state => state.users.current_user);
  const [username, setUsername] = useState(current_user.username);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isRightUser = current_user.id == parseInt(user_id as string);

  useEffect(() => {
    setIsLoading(useAppSelector(state => state.users.isLoading));
  }, [useAppSelector(state => state.users.isLoading)]);

  useEffect(() => {
    setError(useAppSelector(state => state.errors.error));
  }, [useAppSelector(state => state.errors.error)]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateUser(parseInt(user_id as string), username, password));
    if (!error) {
      navigate(`/users/${user_id}`);
    }

  }

  return !isRightUser ? <Navigate to="/" /> :(
    <div>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" className={classes.button}>
            Login
          </Button>
        </form>
      </Paper>
    </div>

  );
};

export default UpdateUser;