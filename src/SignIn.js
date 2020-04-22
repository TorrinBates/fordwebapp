import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import logo from './Ford_logo_flat.svg';
import { Auth } from 'aws-amplify';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(pprops) {
  return <MuiAlert elevation={6} variant="filled" {...pprops} />;
}

const theme = createMuiTheme({
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

/*
This component is used as our sign in page.
Upon successful login attempt you will be directed to the dashboard
*/
export default function SignIn(props) {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  let updateUser = (e) => {
    setUsername(e.target.value);
  };

  let updatePass = (e) => {
    setPassword(e.target.value);
  };

  //Tries the currently entered credentials and if the pair doesnt exist on cognito it shows and error toast
  let login = async event => {
    event.preventDefault();

    try {
      await Auth.signIn(username, password)
      props.userHasAuthenticated(true);
    } catch (e) {
      setOpen(true);
    }
  };
  
  //Handles closing the error toast
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}} >
      <Alert severity="error">Incorrect username and password combination.</Alert>
    </Snackbar>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} width="300" height="115" alt="Ford logo"/>
        <Typography component="h1" variant="h5">
          Ford Vehicle Manager
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