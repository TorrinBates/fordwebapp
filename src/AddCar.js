import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

export default function AddCar() {
    return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
          <Typography align="left" variant="h3">
            Cool!
          </Typography>
    </MuiThemeProvider>
    );
}