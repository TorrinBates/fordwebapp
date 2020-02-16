import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useHistory} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from './Header';
import Box from '@material-ui/core/Box';
import Select from 'react-select';
import { Auth } from 'aws-amplify';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

const customStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? "0 0 0 0.09rem #0055A5" : 0,
    borderColor: state.isFocused ? '#0055A5' : base.borderColor,
    '&:hover': {
      borderColor: state.isFocused ? '#0055A5' : base.borderColor,
    }
  })
};

const mediaStyles = makeStyles(theme => ({
  Boxspacing: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(4)
  },
  Text: {
    fontSize: 26,
  }
}));

function createData(label, value) {
  return {label, value};
}

const mediaOptions = [{ value: "Video", label: "Video" },{ value: "FAQ", label: "FAQ" }];
var primarytags = [];
var secondarytags = [];
var secondarydict = {};

export default function AddMedia(props) {

  const classes = mediaStyles();
  const [value, setValue] = useState(true);
  const [primaryId, setPrimaryId] = useState(null);
  const [secondaryId, setSecondaryId] = useState(null);
  let history = useHistory();

  let backMedia = () => {
    history.goBack();
  }
  let gettable = async event => {
    try {
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car/tag?carid='+props.location.state.carid.toString());
      let responseJson = await response.json();
      const ptags = [];
      for (var tag of responseJson) 
      {
        if (tag.primarytag == true)
        {
          ptags.push(createData(tag.name, tag.tagid));
        }
        else
        {
          if (tag.primarytagid in secondarydict)
          {
            secondarydict[tag.primarytagid].push(createData(tag.name, tag.tagid));
          }
          else
          {
            secondarydict[tag.primarytagid] = [createData(tag.name, tag.tagid)];
          }
        }
      }
      primarytags = ptags;
      setValue(false);
     }
    catch(error) {}
  }
  if (value)
  {
    gettable();
  }
  let select = (opt) => {
    setPrimaryId(opt);
    if (opt != null)
    {
      secondarytags = secondarydict[opt.value];
    }
    else
    {
      secondarytags = [];
    }
    setSecondaryId(null);
  }
  let select2 = (opt) => {
    setSecondaryId(opt);
  }
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
        })
      }).then(function(response) {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      }).then(function(response) {
        backMedia();
      }).catch(function(error) {
        alert(error.message);
      });
    })
  }

  return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
      <Header props={props} title="Add Media"/>
      <Box className={classes.Boxspacing}>
        <b className={classes.Text}>
          Add Media
        </b>
        <form>
          <Box>

            <Select options={mediaOptions} styles={customStyles}/>
          </Box>
          <Select options={primarytags} onChange={opt => select(opt)} value={primaryId} isClearable={true} styles={customStyles}/>
          <Select options={secondarytags} onChange={opt => select2(opt)} value={secondaryId} isClearable={true} styles={customStyles}/>
          <Box display="flex" flexDirection="row-reverse">
            <Button variant="contained" color="primary">Submit</Button>
            <Button onClick={backMedia} variant="outlined" color="primary">Cancel</Button>
          </Box>
        </form>
      </Box>
    </MuiThemeProvider>
  );
}