import axios from 'axios';
import './style.css';
import { Avatar, Box, Button, Card, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const defaultTheme = createTheme();

const Signin = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("btn clicked");
    axios.post("http://localhost:3008/api/login", inputs)
      .then((res) => {
        console.log(res);
        console.log(res.data.person);
        alert(res.data.message);
        if (res.data.message === "successfully logged in") {
          navigate('/Hom');

        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='Sign-in'>
      <div className="card" alignitems='center'>
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
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
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
                  onClick={submitHandler}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <a href="/sign">
                      {"Don't have an account? Sign Up"}
                    </a>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Signin;