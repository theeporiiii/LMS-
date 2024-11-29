import axios from 'axios';
import './style.css';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const AdminSign = () => {
  const [inputs, setInputs] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("btn clicked");

    // Make the POST request with the user inputs
    axios.post("http://localhost:3008/api/login", inputs)
      .then((res) => {
        console.log(res); // For debugging purposes
        console.log(res.data.person); // Log the user info (including role)

        if (res.data.message === "successfully logged in") {
          // Check the role from the response
          if (res.data.person && res.data.person.Role === 'Admin') {
            // If role is "Admin", navigate to /Hom
            navigate('/Hom');
          } else {
            // If role is not "Admin", alert the user
            alert("You do not have permission to access this page.");
          }
        } else {
          // If login failed, alert the user
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className='Sign-in'>
      <div className="card" alignItems='center'>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={submitHandler}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={inputs.username}
                  onChange={inputHandler}
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
                  value={inputs.password}
                  onChange={inputHandler}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AdminSign;
