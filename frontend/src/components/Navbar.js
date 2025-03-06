import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Login', path: '/login' },
    { label: 'Registration', path: '/registration' }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'rgba(15, 15, 35, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          color: '#fff',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'background 0.3s',
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              background: 'linear-gradient(145deg, #d4418e, #0652c5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 0px 10px rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            CoWhiteboard
          </Typography>
          {navItems.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#ff4081' : '#c0c0c0',
                fontSize: '1.1rem',
                fontFamily: 'Roboto, sans-serif',
                textTransform: 'none',
                position: 'relative',
                mx: 1.5,
                transition: 'color 0.3s, transform 0.3s',
                '&:hover': {
                  color: '#ff80ab',
                  transform: 'scale(1.05)'
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: location.pathname === item.path ? '100%' : '0%',
                  height: '2px',
                  bottom: '-5px',
                  left: '0',
                  backgroundColor: '#ff4081',
                  boxShadow: '0px 0px 8px rgba(255, 110, 196, 0.8)',
                  transition: 'width 0.3s'
                },
                '&:hover:after': {
                  width: '100%'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
