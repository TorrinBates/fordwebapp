import React from 'react';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Header from './Header';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

export default function AddCar(props) {

  let history = useHistory();
  let home = () => {
    history.push("/dashboard");
  };
  let submit = () => {
    home();
  };

    return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
        <Header props={props} title="Add Car"/>
        <form>
          <TextField variant="outlined" margin="normal" required fullWidth id="make" label="Make"/>
          <TextField variant="outlined" margin="normal" required fullWidth id="model" label="Model"/>
          <TextField variant="outlined" margin="normal" required fullWidth id="year" label="Year"/>
          <TextField variant="outlined" margin="normal" required fullWidth id="link" label="Owners Manual URL"/>
          <Box display="flex" flexDirection="row-reverse">
            <Button onClick={submit} variant="contained" color="primary">Submit</Button>
            <Button variant="outlined" color="primary">Cancel</Button>
          </Box>
        </form>
    </MuiThemeProvider>
    );
}