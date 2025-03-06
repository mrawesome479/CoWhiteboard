import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerUser } from '../services/apiService';

const defaultTheme = createTheme();

export const Registration = () => {
  const formRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
      
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const requestData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      role: "USER"
    };

    try {
      const responseData = await registerUser(requestData); 
      setSnackbarMessage('User registered successfully! Please continue with Login');
      setOpenSnackbar(true);
      formRef.current.reset();
    } catch (error) {
      setSnackbarMessage('Error while registering user!');
      setOpenSnackbar(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3
      }}>
        <Container component="main" maxWidth="xs" sx={{ 
          backdropFilter: 'blur(15px)', 
          background: 'rgba(255, 255, 255, 0.85)', 
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', 
          borderRadius: '20px', 
          padding: '30px'
        }}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ 
              m: 1, 
              bgcolor: '#ff4081', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
            }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontWeight: 600, 
                mb: 2,
                color: '#333'
              }}
            >
              Sign up
            </Typography>
            <Box component="form" ref={formRef} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    variant="outlined"
                    InputProps={{
                      sx: {
                        borderRadius: '30px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                          borderColor: '#ff4081',
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        borderRadius: '30px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        borderRadius: '30px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        borderRadius: '30px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        borderRadius: '30px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  background: 'linear-gradient(45deg, #ff4081, #ff80ab)',
                  color: 'white',
                  borderRadius: '30px',
                  boxShadow: '0 4px 12px rgba(255, 105, 135, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #e91e63, #f48fb1)',
                  }
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" style={{ textDecoration: 'none', color: '#0288D1' }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
