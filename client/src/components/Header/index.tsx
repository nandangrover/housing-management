import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { UserContext } from '../../App';
import Sidebar from '../Sidebar';
import { RouteComponentProps } from 'react-router-dom';
import './styles.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  // Context provides info regarding existance of user
  const { user } = useContext(UserContext);

  const [isOpened, setSideBarOpen] = useState(false);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const handleMenu = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    props.history.replace('/logout');
  };

  const openSideBar = (): any => {
    setSideBarOpen(true);
  };

  return (
    <div className={classes.root}>
      {user && <Sidebar isOpened={isOpened} onClose={setSideBarOpen} />}
      <AppBar position="static">
        <Toolbar>
          {user && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={openSideBar}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Tesla Society
          </Typography>
          {user && (
            <div className="account-holder">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <Typography
                align="center"
                variant="body2"
                className={classes.title}
                display="inline">
                Logged in as {user?.name ?? ''}
              </Typography>
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
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>My Notices</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
