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
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(pprops) {
  return <MuiAlert elevation={6} variant="filled" {...pprops} />;
}

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
    height: '56px',
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
  TagsText: {
    fontSize: 22,
  },
  SelectText: {
    fontSize: 17,
  },
  Formspacing: {
    margin: theme.spacing(0, 5, 2, 5)
  },
  Tagspacing: {
    margin: theme.spacing(2, 8, 2, 8),
    width: '60%'
  },
}));

var valid = {"PrimaryId": false, "Type": false, "MediaLabel": false, "Link": false}

function resetDict() {
  for (const prop in valid)
  {
    valid[prop] = false;
  }
}

const mediaOptions = [{ value: "Video", label: "Video" },{ value: "FAQ", label: "FAQ" }];
var secondarytags = [];

export default function AddMedia(props) {

  var primarytags = props.location.state.primarytags;
  var secondarydict = props.location.state.secondarydict;
  const classes = mediaStyles();
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [primaryId, setPrimaryId] = useState(null);
  const [secondaryId, setSecondaryId] = useState(null);
  const [type, setType] = useState(null);
  const [medialabel, setMediaLabel] = useState("");
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

    if (valid["PrimaryId"] && valid["Type"] && valid["MediaLabel"] && valid["Link"])
    {
      setDisabled(false);
    }
    else 
    {
      setDisabled(true);
    }
  };
  let updateMediaLabel = (e) => {
    var v = e.target.value;
    setMediaLabel(v);
    checkComplete({"MediaLabel": v});
  };
  let updateLink = (e) => {
    var v = e.target.value;
    setLink(v);
    checkComplete({"Link": v});
  };
  let backMedia = () => {
    resetDict();
    history.goBack();
  }
  let selectPrimary = (opt) => {
    setPrimaryId(opt);
    if (opt != null)
    {
      secondarytags = secondarydict[opt.value];
      checkComplete({"PrimaryId": "Good"});
    }
    else
    {
      secondarytags = [];
      checkComplete({"PrimaryId": ""});
    }
    setSecondaryId(null);
  }
  let selectSecondary = (opt) => {
    setSecondaryId(opt);
  }
  let selectType = (opt) => {
    setType(opt);
    if (opt != null)
    {
      checkComplete({"Type": "Good"});
    }
    else
    {
      checkComplete({"Type": ""});
    }
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
      }).then(function() {
        backMedia();
      }).catch(function() {
        setOpen(true);
      });
    })
  }
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
        <b className={classes.Text}>Add Media</b>
        <form className={classes.Formspacing}>
          <TextField variant="outlined" margin="normal" required fullWidth id="medialabel" label="Media Label" name="medialabel" autoComplete="medialabel" onChange={updateMediaLabel}/>
          <TextField variant="outlined" className={classes.SecondTextField} required fullWidth id="link" label="Media URL" name="link" autoComplete="link" onChange={updateLink}/>
          <b className={classes.SelectText}>Media Type</b>
          <Select options={mediaOptions} onChange={opt => selectType(opt)} value={type} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
          <Box>
            <b className={classes.TagsText}>Tags</b>
          </Box>
          <Box className={classes.Tagspacing}>
            <b className={classes.SelectText}>Primary</b>
            <Select options={primarytags} onChange={opt => selectPrimary(opt)} value={primaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
            <b className={classes.SelectText}>Secondary</b>
            <Select options={secondarytags} onChange={opt => selectSecondary(opt)} value={secondaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
          </Box>
          <Box display="flex" flexDirection="row-reverse">
            <Button disabled={disabled} onClick={submit} variant="contained" color="primary">Submit</Button>
            <Button onClick={backMedia} variant="outlined" color="primary">Cancel</Button>
          </Box>
        </form>
      </Box>
    </MuiThemeProvider>
  );
}