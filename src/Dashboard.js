import React from 'react';
import {useHistory} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Table from './CarTable'
import Header from './Header';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

const dashStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(10)
  },
  Add: {
    float: 'right',
    margin: theme.spacing(1, 0, 1, 0),
    fontSize: 22
  }
}));

export default function Dashboard(props) {

  const classes = dashStyles();

  let history = useHistory();
  let addcar = () => {
    history.push("/addcar");
  };

    return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />  
      <Header props={props} title="Dashboard"/> 
      <Container className={classes.container} >
        <Button onClick={addcar} variant="contained" color="primary" className={classes.Add}>
          Add Car +
        </Button>
        <Table />
      </Container>
    </MuiThemeProvider>
    );
}