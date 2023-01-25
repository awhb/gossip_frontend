import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { fetchSelectedUser, deleteUser } from '../../store/user-actions';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Paper,
  Button,
  makeStyles
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  icon: {
    fontSize: '6rem',
    marginRight: theme.spacing(2),
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const User: React.FC = () => {
  const classes = useStyles();
  const { user_id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(state => state.users.selected_user);
  const current_user_id = useAppSelector(state => state.users.current_user.id);

  useEffect(() => {
    dispatch(fetchSelectedUser(parseInt(user_id as string)));
  }, [dispatch, user_id]);

  const handleDelete = () => {
    dispatch(deleteUser(parseInt(user_id as string)));
    navigate("/");
  };

  return (
    <Paper>
      <Grid container className={classes.root}>
        <AccountCircle className={classes.icon} />
        <div className={classes.text}>
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="body2">created at {user.created_at.toISOString}</Typography>
          {
            user.id == current_user_id &&
            <>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete User
              </Button>
              <Link to={`/users/${current_user_id}/update`}>
                <Button variant="contained" color="primary">
                  Update User
                </Button>
              </Link>
            </>
          }
        </div>
      </Grid>
    </Paper>
  );

};

export default User;