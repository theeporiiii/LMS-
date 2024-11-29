import { Avatar, Box, Button, Card, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import './style.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const defaultTheme = createTheme();

const Signup = () => {
const [inputs,setInputs]=useState({});

   const submitHandler=()=>{
        console.log("btn clicked",inputs);
        axios.post("http://localhost:3008/api/post",inputs)
        .then((res)=>{
          console.log(res);
          alert("user signed");
                })
    }

    const inputHandler=(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value});
        console.log(inputs);
    }
  

  return (
   
      <div className='Sign-up'>
         
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
            Sign Up
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              Sign up
            </Button>
            <Grid container>
            <Grid item>
            <a href="/in">
         
             Back to Log in
                </a>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>



    </div>
  );
}

export default Signup
