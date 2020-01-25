import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from './b.png';
import {useHistory, useLocation} from 'react-router-dom';
import { Auth } from 'aws-amplify';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  
  let username = "abc";
  let password = "123";
  const classes = useStyles();

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/dashboard" } };

  let updateUser = (e) => {
    username = e.target.value;
  };

  let updatePass = (e) => {
    password = e.target.value;
  };

  let login = async event => {
		event.preventDefault();

		try {
			await Auth.signIn(username, password);
			history.replace(from);
		} catch (e) {
			alert("Incorrect username and password combination.");
		}
	};

  return (
    <MuiThemeProvider theme={the}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} width="300" height="239">

        </img>
        <Typography component="h1" variant="h5">
          DB Editor Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={updateUser}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={updatePass}
          />
          <Button
            onClick={login}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
    </MuiThemeProvider>
  );
}