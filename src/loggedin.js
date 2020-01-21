import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function LoggedIn() {
  
    return (     
    <Container>
        <CssBaseline /> 
        <Typography variant="h1">
          Logged In!
        </Typography>
    </Container>
    );
}