import AppHeader from "../components/AppHeader"
import { Grid, Typography, Paper, Button, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";

export const Profile = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      };
    

    const userData = {
        username: 'veeetmoradiya123',
        email: 'veeetmoradiya123@gmail.com',
        firstName: 'veet',
        lastName: 'moradiya',
        role: 'ADMIN',
    }

    const handleNaviagateBack = () => {
        window.history.back();
    }

    return (
        <div>
            <AppHeader isProfilePage={true} />

            <Grid container spacing={2}>
                <Grid item xs={6} style={{ marginTop: 5 }}>
                    <Button onClick={handleNaviagateBack} variant="contained" style={{ marginLeft: 10, marginTop: 10}} startIcon={<ArrowBackIcon />}>Back</Button>
                    <Typography variant="h5" align="center">
                        Profile Page
                    </Typography>
                </Grid>
     
                <Grid item xs={6} style={{ marginLeft: 10}}>
                    <Paper elevation={3} style={{padding: 10}}>
                        <Typography variant="h6">Username: {userData.username}</Typography>
                        <Typography variant="body1">Email: {userData.email}</Typography>
                        <Typography variant="body1">First Name: {userData.firstName}</Typography>
                        <Typography variant="body1">Last Name: {userData.lastName}</Typography>
                        <Typography variant="body1">Role: {userData.role}</Typography>
                        <Typography variant="body1">Created At: {new Date().toLocaleString()}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={6} style={{ marginTop: 5 }}>
                    <Typography variant="h5" align="center">
                        Reset password
                    </Typography>
                </Grid>
     
                <Grid item xs={6} style={{ marginLeft: 10}}>
                    <Paper elevation={3} style={{padding: 10}}>
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
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Reset Password
                        </Button>
                    </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}