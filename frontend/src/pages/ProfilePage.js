import AppHeader from "../components/AppHeader";
import { Grid, Typography, Paper, Button, TextField, Box, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { getUserInfoByUserId, resetPassword } from "../services/apiService";

export const Profile = () => {

  const userId = localStorage.getItem('userId');
  const [userInfo, setUserInfo] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleSnackbarClose = () => setOpenSnackbar(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
    
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const responseData = await getUserInfoByUserId(userId);
        setUserInfo(responseData.user);
      } catch (error) {
        console.log(`Error loading user info: ${error}`);
      }
    };
    fetchDataAsync();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setSnackbarMessage('New password and confirm password do not match!');
      setOpenSnackbar(true);
      return;
    }
    try {
      const response = await resetPassword(userId, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setSnackbarMessage(response.message);
      setOpenSnackbar(true);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      setSnackbarMessage(error.response.data.message);
      setOpenSnackbar(true);
    }
  };

  const handleNavigateBack = () => {
    window.history.back();
  };

  return (
    <Box sx={{ background: 'linear-gradient(to right, #e0eafc, #cfdef3)', minHeight: '100vh', padding: 3 }}>
      <AppHeader isProfilePage={true} />
      
      <Button 
        onClick={handleNavigateBack} 
        variant="contained" 
        startIcon={<ArrowBackIcon />} 
        sx={{
          backgroundColor: '#007BFF', 
          color: '#fff', 
          mb: 3,
          '&:hover': {
            backgroundColor: '#0056b3'
          }
        }}
      >
        Back
      </Button>
      
      <Typography variant="h4" align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, mb: 4 }}>
        Profile Page
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.7)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              borderRadius: '20px',
              p: 3
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>User Information</Typography>
              <Typography variant="body1"><strong>Username:</strong> {userInfo.username}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {userInfo.email}</Typography>
              <Typography variant="body1"><strong>First Name:</strong> {userInfo.firstName}</Typography>
              <Typography variant="body1"><strong>Last Name:</strong> {userInfo.lastName}</Typography>
              <Typography variant="body1"><strong>Role:</strong> {userInfo.role}</Typography>
              <Typography variant="body1"><strong>Created At:</strong> {userInfo.createdAt}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card
            sx={{
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.7)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              borderRadius: '20px',
              p: 3
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Reset Password</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ 
                    mt: 3, 
                    backgroundColor: '#28a745', 
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#218838'
                    }
                  }}
                >
                  Reset Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  );
};
