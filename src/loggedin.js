import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';

export default function LoggedIn(props) {

  let signout = async event => {
		event.preventDefault();

		try {
      await Auth.signOut();
      props.userHasAuthenticated(false);
		} catch (e) {
    }
  
  };
  
    return (     
    <Container>
        <CssBaseline /> 
        <Typography variant="h1">
          Logged In!
        </Typography>
        <Button
            onClick={signout}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Out
          </Button>
    </Container>
    );
}