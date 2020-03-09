import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useHistory} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from './Header';
import TextField from '@material-ui/core/TextField';
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
    boxShadow: state.isFocused ? "0 0 0 0.08rem #0055A5" : 0,
    borderColor: state.isFocused ? '#0055A5' : base.borderColor,
    '&:hover': {
      borderColor: state.isFocused ? '#0055A5' : base.borderColor,
    }
  })
};

const mediaStyles = makeStyles(theme => ({
  Boxspacing: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10)
  },
  Text: {
    fontSize: 26,
  },
  Dropdown: {
    marginBottom: theme.spacing(2)
  },
  SecondTextField: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  SelectText: {
    fontSize: 17,
  },
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
  const [type, setType] = useState(null);
  const [medialabel, setMediaLabel] = useState("");
  const [link, setLink] = useState("");
  let history = useHistory();

  let updateMediaLabel = (e) => {
    setMediaLabel(e.target.value);
  };
  let updateLink = (e) => {
    setLink(e.target.value);
  };

  let backMedia = () => {
    history.goBack();
  }
  let gettags = async event => {
    try {
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car/tag?carid='+props.location.state.carid.toString());
      let responseJson = await response.json();
      const ptags = [];
      for (var tag of responseJson) 
      {
        if (tag.primarytag === true)
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
    gettags();
  }
  let selectPrimary = (opt) => {
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
  let selectSecondary = (opt) => {
    setSecondaryId(opt);
  }
  let selectType = (opt) => {
    setType(opt);
  }
  let submit = () => {
    Auth.currentSession().then(async res=>{
      let idToken = res.getIdToken();
      let jwt = idToken.getJwtToken();

      await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car/media', {
        method: 'POST',
        headers: {
          'Authorization': jwt
        },
        body: JSON.stringify({
          carId: props.location.state.carid,
          name: medialabel,
          type: type.label,
          link: link,
          primaryTag: primaryId.value,
          secondaryTag: secondaryId == null ? null : secondaryId.value
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
      <Header props={props}/>
      <Box className={classes.Boxspacing}>
        <b className={classes.Text}>Add Media</b>
        <form>
          <TextField variant="outlined" margin="normal" required fullWidth id="medialabel" label="Media Label" name="medialabel" autoComplete="medialabel" onChange={updateMediaLabel}/>
          <TextField variant="outlined" className={classes.SecondTextField} required fullWidth id="link" label="Media URL" name="link" autoComplete="link" onChange={updateLink}/>
          <b className={classes.SelectText}>Type</b>
          <Select options={mediaOptions} onChange={opt => selectType(opt)} value={type} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
          <b className={classes.SelectText}>Primary Tag</b>
          <Select options={primarytags} onChange={opt => selectPrimary(opt)} value={primaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
          <b className={classes.SelectText}>Secondary Tag</b>
          <Select options={secondarytags} onChange={opt => selectSecondary(opt)} value={secondaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
          <Box display="flex" flexDirection="row-reverse">
            <Button onClick={submit} variant="contained" color="primary">Submit</Button>
            <Button onClick={backMedia} variant="outlined" color="primary">Cancel</Button>
          </Box>
        </form>
      </Box>
    </MuiThemeProvider>
  );
}