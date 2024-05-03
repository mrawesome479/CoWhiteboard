import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';

const AppHeader = ({isProfilePage}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOptions = [
    {
      title: 'profile',
      icon: <Person2Icon />,
      path: '/profile'
    },
    {
      title: 'logout',
      icon: <LogoutIcon />,
      action: () => handleLogout()
    }
  ];

  const handleAvatarIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  }

  const handleMenuOptionClick = (option) => {
    console.log(option);
    switch (option) {
      case 'profile':
        console.log(`profile option selected`);

        break;
      case 'logout':
        console.log(`logout option selected`);
        break;
      default:
        console.log('Invalid menu option');
    }
    handleAvatarMenuClose(); // Close the menu after clicking an option
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CoSketch
        </Typography>
        {!isProfilePage && 
          <IconButton onClick={handleAvatarIconClick} color="inherit">
          <AccountCircleIcon />
        </IconButton>
        }
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleAvatarMenuClose}
        >
          {menuOptions.map((option, index) => (
            <MenuItem sx={{ padding: 2 }} key={index} onClick={option.action || handleAvatarMenuClose}>
              {option.path ? (
                <Link to={option.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {option.icon} {option.title}
                </Link>
              ) : (
                <>
                  {option.icon} {option.title}
                </>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
