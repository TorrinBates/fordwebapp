import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import BlockLoading from './BlockLoading';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

function Alert(pprops) {
  return <MuiAlert elevation={6} variant="filled" {...pprops} />;
}

const addCarStyles = makeStyles(theme => ({
  Loading: {
    backgroundColor: '#0055A5',
    color: '#eb4034',
  },
  Text: {
    fontSize: 26,
  },
  Boxspacing: {
    margin: theme.spacing(2, 7, 0, 7)
  },
  Formspacing: {
    margin: theme.spacing(0, 5, 2, 5)
  },
}));

var valid = {"Make": false, "Model": false, "Year": false, "Link": false}

function resetDict() {
  for (const prop in valid)
  {
    valid[prop] = false;
  }
}

export default function AddCar(props) {

  const classes = addCarStyles();
  const [disabled, setDisabled] = useState(true);
  const [hidden, setIsHidden] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [link, setLink] = useState("");
  let history = useHistory();

  let checkComplete = (dic) => {
    var key = Object.keys(dic)[0];
    if (dic[key] !== "")
    {
      valid[key] = true;
    }
    else
    {
      valid[key] = false;
    }

    if (valid["Make"] && valid["Model"] && valid["Year"] && valid["Link"])
    {
      setDisabled(false);
    }
    else 
    {
      setDisabled(true);
    }
  };
  let updateMake = (e) => {
    var value = e.target.value;
    setMake(value);
    checkComplete({"Make": value});
  };
  let updateModel = (e) => {
    var value = e.target.value;
    setModel(value);
    checkComplete({"Model": value});
  };
  let updateYear = (e) => {
    var value = e.target.value;
    setYear(value);
    checkComplete({"Year": value});
  };
  let updateLink = (e) => {
    var value = e.target.value;
    setLink(value);
    checkComplete({"Link": value});
  };
  let home = () => {
    resetDict();
    history.push("/dashboard");
  };
  let submit = () => {
    setIsHidden(false);
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
        setIsHidden(true);
        setOpen(true);
      });
    })
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
        <Header props={props}/>
        <Box className={classes.Boxspacing}>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} >
            <Alert severity="error">Error: Check form and try again.</Alert>
          </Snackbar>
          <b className={classes.Text}>Add Supported Vehicle</b>
          <form className={classes.Formspacing}>
            <TextField variant="outlined" margin="normal" required fullWidth id="make" label="Make" onChange={updateMake}/>
            <TextField variant="outlined" margin="normal" required fullWidth id="model" label="Model" onChange={updateModel}/>
            <TextField variant="outlined" margin="normal" required fullWidth id="year" label="Year" onChange={updateYear}/>
            <TextField variant="outlined" margin="normal" required fullWidth id="link" label="Owners Manual URL" onChange={updateLink}/>
            <Box display="flex" flexDirection="row-reverse">
              <Button disabled={disabled} onClick={submit} variant="contained" color="primary">Submit</Button>
              <Button onClick={home} variant="outlined" color="primary">Cancel</Button>
            </Box>
            <BlockLoading isHidden={hidden} color='#0055A5' size="large"/>
          </form>
        </Box>
    </MuiThemeProvider>
  );
}