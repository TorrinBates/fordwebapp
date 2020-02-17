import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Header from './Header';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Auth } from 'aws-amplify';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

export default function AddCar(props) {

  //const [canClick, setCanClick] = useState(true);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [link, setLink] = useState("");
  let history = useHistory();

  let updateMake = (e) => {
    setMake(e.target.value);
  };
  let updateModel = (e) => {
    setModel(e.target.value);
  };
  let updateYear = (e) => {
    setYear(e.target.value);
  };
  let updateLink = (e) => {
    //if(link != "")
    //{
    //  setCanClick(false);
    //}
    setLink(e.target.value);
  };
  let home = () => {
    history.push("/dashboard");
  };
  let submit = () => {
    Auth.currentSession().then(async res=>{
      let idToken = res.getIdToken();
      let jwt = idToken.getJwtToken();

      await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car', {
        method: 'POST',
        headers: {
          'Authorization': jwt
        },
        body: JSON.stringify({
          make: make,
          model: model,
          year: year,
          ownermanual: link
        })
      }).then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      }).then(function(response) {
        home();
      }).catch(function(error) {
        alert(error.message);
      });
    })
  };

  return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
        <Header props={props} title="Add Car"/>
        <Container component="main" maxWidth="md">
          <form>
            <TextField variant="outlined" margin="normal" required fullWidth id="make" label="Make" onChange={updateMake}/>
            <TextField variant="outlined" margin="normal" required fullWidth id="model" label="Model" onChange={updateModel}/>
            <TextField variant="outlined" margin="normal" required fullWidth id="year" label="Year" onChange={updateYear}/>
            <TextField variant="outlined" margin="normal" required fullWidth id="link" label="Owners Manual URL" onChange={updateLink}/>
            <Box display="flex" flexDirection="row-reverse">
              <Button onClick={submit} variant="contained" color="primary">Submit</Button>
              <Button onClick={home} variant="outlined" color="primary">Cancel</Button>
            </Box>
          </form>
        </Container>
    </MuiThemeProvider>
  );
}