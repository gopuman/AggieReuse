import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Navigate, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(2),
  },
  card: {
    width: '300px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const LoginSignUpPage = () => {
  const classes = useStyles();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    (async () => {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          'credentials': 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginForm),
        });
  
        if (response.ok) {
          navigate("/");
          console.log('Login successful');
        } else {
          // Handle login failure
          console.log('Login failed');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    (async () => {
      try {
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          'credentials': 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupForm),
        });
        console.log(response);
        if (response.ok) {
          // Handle successful signup
          console.log('Signup successful');
        } else {
          // Handle signup failure
          console.log('Signup failed');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Grid container className={classes.root} spacing={10}>
      <Grid item>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleLoginSubmit}>
              <TextField
                label="Email"
                type="email"
                name="email"
                fullWidth
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submitButton}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" align="center" gutterBottom>
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={handleSignupSubmit}>
              <TextField
                label="Email"
                type="email"
                name="email"
                fullWidth
                value={signupForm.email}
                onChange={handleSignupChange}
                required
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                value={signupForm.password}
                onChange={handleSignupChange}
                required
              />
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                fullWidth
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                className={classes.submitButton}
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginSignUpPage;
