import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import userSlice from '../store/users/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { logoutUser } from '../store/users/user-actions';

// Useful for toggling sort
{/* 
  const [auth, setAuth] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };
<FormGroup>
<FormControlLabel
  control={
    <Switch
      checked={auth}
      onChange={handleChange}
      aria-label="login switch"
    />
  }
  label={auth ? 'Logout' : 'Login'}
/>
</FormGroup> */
}

export default function MenuAppBar() {
  const curr_user_id = useAppSelector(state => state.users.current_user.id);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isLoggedIn = curr_user_id !== 0 && localStorage.hasOwnProperty("token");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToUserPage = () => {
    handleClose();
    navigate(`/user/${curr_user_id}`);
  };

  const logOut = () => {
    dispatch(logoutUser());
    handleClose();
    navigate("/");
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gossip On Rails
          </Typography>
          {isLoggedIn && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={goToUserPage}>My Account</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!isLoggedIn && (
            <Link to='/login'>
              <Button color="inherit" sx={{ flexGrow: 0 }}>Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}