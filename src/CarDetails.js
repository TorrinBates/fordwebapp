import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useHistory} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Header from './Header';
import MediaTable from './MediaTable'
import Card from './CarCard'

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

const dashStyles = makeStyles(theme => ({
  Container: {
    marginTop: theme.spacing(0),
    marginRight: theme.spacing(17),
    marginLeft: theme.spacing(17)
  },
  Add: {
    float: 'right',
    margin: theme.spacing(1, 0, 1, 0),
    fontSize: 22,
    border: '2px solid',
    borderColor: '#FAFAFA',
    '&:hover': {
      borderColor: '#0055A5'
    }
  }
}));

export default function CarInfo(props) {
  
  const classes = dashStyles();
  let history = useHistory();

  let AddMedia = () => {
    history.push({pathname: '/addmedia', state: { carid: props.location.state.carid }});
  };

  return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
      <Header props={props}/>
      <Card icon={props.location.state.icon} model={props.location.state.model} year={props.location.state.year} carid={props.location.state.carid}/>
      <Grid className={classes.Container}>
        <Button onClick={AddMedia} color="primary" className={classes.Add}>
          + Add Media
        </Button>
        <MediaTable carid={props.location.state.carid}/>
      </Grid>
    </MuiThemeProvider>
  );
}