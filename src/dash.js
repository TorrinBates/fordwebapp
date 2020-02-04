import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Auth } from 'aws-amplify';
import { Container } from '@material-ui/core';
import Table from './TempTable'
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

const dashStyles = makeStyles(theme => ({
  submit: {
    float: 'right',
    margin: theme.spacing(1, 1, 1, 1),
  },
  header: {
    margin: theme.spacing(0, 1, 1, 1),
  },
  container: {
    marginTop: theme.spacing(10)
  },
  Add: {
    float: 'right',
    margin: theme.spacing(1, 0, 1, 0),
  }
}));

export default function LoggedIn(props) {

  const classes = dashStyles();

  let signout = async event => {
		event.preventDefault();

		try {
      await Auth.signOut();
      props.userHasAuthenticated(false);
		} catch (e) {
    }
  
  };
  
    return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
      <Grid>
          <Button onClick={signout} type="submit" variant="outlined" color="primary" className={classes.submit}>
            Sign Out
          </Button>
          <Typography align="left" variant="h3" className={classes.header}>
            Add/Edit Cars
          </Typography>
          <Container className={classes.container} >
            <Button variant="contained" color="primary" className={classes.Add}>
              Add Car +
            </Button>
            <Table>

            </Table>
          </Container>
      </Grid>
    </MuiThemeProvider>
    );
}