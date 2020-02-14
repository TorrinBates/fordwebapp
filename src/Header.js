import React from 'react';
import {useHistory} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Auth } from 'aws-amplify';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import logo from './Ford_logo_flat.svg';

const headerStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(0, 1, 0, 0),
    backgroundColor: '#FAFAFA',
    color: '#0055A5',
    '&:hover': {
      backgroundColor: '#C91717',
      color: '#FAFAFA'
    }
  },
  logo: {
    margin: theme.spacing(1, 1, 0, 1),
  },
  home: {
    margin: theme.spacing(1, 1, 1, 1),
    backgroundColor: '#FAFAFA',
    color: '#0055A5',
    '&:hover': {
      backgroundColor: '#C91717',
      color: '#FAFAFA'
    }
  }
}));

export default function Header(props) {

  const classes = headerStyles();

  let signout = async event => {
		event.preventDefault();

	try {
      await Auth.signOut();
      props.props.userHasAuthenticated(false);
	} catch (e) {
        alert(e.message);
    }
  };

  let history = useHistory();
  let home = () => {
    history.push("/dashboard");
  };
  
    return (    
      <Grid style={{backgroundColor: '#0055A5', color: 'white'}} >
        <CssBaseline /> 
        <Box display="flex">
          <Box alignSelf="center" className={classes.logo}>
            <img al src={logo} width="197.8" hieght="75.9"/>
          </Box>
          <Box flexGrow={1}/>
          <Box alignSelf="center">
            <IconButton onClick={home} className={classes.home} size='medium'>
              <HomeIcon/>
            </IconButton>
          </Box>
          <Box alignSelf="center">
            <Button onClick={signout} type="submit" variant="outlined" className={classes.submit}>
              Sign Out
            </Button>
          </Box>
        </Box>
      </Grid>
    );
}