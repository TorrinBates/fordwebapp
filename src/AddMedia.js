import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useHistory} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from './Header';
import MediaTable from './MediaTable'

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

const dashStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(13),
    marginRight: theme.spacing(17),
    marginLeft: theme.spacing(17)
  },
}));

export default function CarInfo(props) {
  const classes = dashStyles();

  let history = useHistory();
  let AddMedia = () => {
    history.push("/addmedia");
  };

    return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
      <Header props={props} title="Add Media"/>
      <Grid className={classes.container}>

      </Grid>
    </MuiThemeProvider>
    );
}