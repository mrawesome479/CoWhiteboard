import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';

export const Login = () => {
  const formRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const reqData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const responseData = await loginUser(reqData); 
      setSnackbarMessage('User logged in successfully!');
      setOpenSnackbar(true);

      formRef.current.reset();
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userId', responseData.userId);
      localStorage.setItem('username', responseData.username);
      localStorage.setItem('fullname', responseData.fullname);

      navigate('/whiteboards');
    } catch (error) {
      setSnackbarMessage('Incorrect username or password!');
      setOpenSnackbar(true);
    }
  };

  return (
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
            Sign In
          </Typography>
          <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: '30px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ color: '#666' }}
            />
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" style={{ textDecoration: 'none', color: '#0288D1' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/registration" style={{ textDecoration: 'none', color: '#0288D1' }}>
                  Don't have an account? Sign Up
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
  );
}
