import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Auth } from 'aws-amplify';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

const headerStyles = makeStyles(theme => ({
  submit: {
    float: 'right',
    margin: theme.spacing(1, 1, 1, 1),
    backgroundColor: '#FAFAFA',
    color: '#0055A5',
    '&:hover': {
      backgroundColor: '#C91717',
      color: '#FAFAFA'
    }
  },
  header: {
    margin: theme.spacing(0, 1, 0, 1),
  },
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
  
    return (    
      <Grid style={{backgroundColor: '#0055A5', color: 'white'}}>
        <CssBaseline /> 
        <Button onClick={signout} type="submit" variant="outlined" className={classes.submit}>
          Sign Out
        </Button>
        <Typography align="left" variant="h3" className={classes.header}>
          {props.title}
        </Typography>
      </Grid>
    );
}