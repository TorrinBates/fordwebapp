import React, { useState } from 'react';
import { MuiThemeProvider, createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import ARTag from './ARTag';
import { Auth } from 'aws-amplify';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C91717'
    }
  },
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5, 5, 5, 5),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 3px 5px 2px #C2C1C1',
    borderRadius: 10,
  },
  app: {
    backgroundColor: '#0055A5',
    fontSize: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  save: {
    borderRadius: 5,
    padding: theme.spacing(0, 4, 0, 4),
    margin: theme.spacing(2, 2, 2, 2),
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    color: '#0055A5',
    '&:hover': {
      backgroundColor: '#C91717',
      borderColor: '#C91717',
      color: '#FFFFFF'
    },
  }
}));

const StyledTab = withStyles({
    root: {
        fontSize: 21,
        textTransform: 'none',
        padding: '16px',
    },
})(Tab);

export default function ARTabs(props) {

  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [value, setValue] = useState(true);
  const [containers, setContainers] = useState({"carsSAR": {}, "carsEAR": {}, "carsIAR": {}, "Steering": [], "Entertainment": [], "Instrument": []});
  const [data, setData] = useState({});

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  let getAR = async event => {
    try {
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/ar-button');
      let responseJson = await response.json();

      var stags = [];
      var etags = [];
      var itags = [];
      for (var tag of responseJson) 
      {
        if (tag.section === "Steering Wheel")
        {
          stags.push(tag);
        }
        else if (tag.section === "Entertainment System")
        {
          etags.push(tag);
        }
        else if (tag.section === "Instrument Cluster")
        {
          itags.push(tag);
        }
      }
    }
    catch(error) {}
    try {
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car/ar?carid='+props.carid.toString());
      let responseJson = await response.json();
      
      var carssar = {};
      var carsiar = {};
      var carsear = {};
      for (var tag of responseJson) 
      {
        if (tag.section === "Steering Wheel")
        {
          carssar[tag.feature] = tag;
        }
        else if (tag.section === "Entertainment System")
        {
          carsear[tag.feature] = tag;
        }
        else if (tag.section === "Instrument Cluster")
        {
          carsiar[tag.feature] = tag;
        }
      }
    }
    catch(error) {}
    setContainers({"carsSAR": carssar, "carsEAR": carsear, "carsIAR": carsiar, "Steering": stags, "Entertainment": etags, "Instrument": itags});
    setValue(false);
  }

  let save = () => {
    var payload = [];
    for (var key of Object.keys(data))
    {
      if (data[key]["location"] != null && data[key]["primaryTag"] != null)
      {
        data[key]["location"] = data[key]["location"].value;
        data[key]["primaryTag"] = data[key]["primaryTag"].value;
        data[key]["secondaryTag"] = (data[key]["secondaryTag"] == null ? null : data[key]["secondaryTag"].value);
        payload.push(data[key]);
      }
    }
    console.log(payload);
    Auth.currentSession().then(async res=>{
      let idToken = res.getIdToken();
      let jwt = idToken.getJwtToken();

      await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car/ar', {
        method: 'POST',
        headers: {
          'Authorization': jwt
        },
        body: JSON.stringify(payload)
      }).then(function(response) {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      }).then(function() {
        //finished
        setData({});
      }).catch(function() {
        //error
      });
    })
  };

  if (value)
  {
    getAR();
  }


  return (
    !value &&
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.app}>
          <Tabs value={tab} indicatorColor="primary" onChange={handleChange} aria-label="AR Tagging Tabs">
            <StyledTab label="Steering Wheel" {...a11yProps(0)} />
            <StyledTab label="Instrument Cluster" {...a11yProps(1)} />
            <StyledTab label="Entertainment System" {...a11yProps(2)} />
            <Box flexGrow={1}/>
            <Button onClick={save} className={classes.save}> Save </Button>
          </Tabs>
        </AppBar>
        <Box p={3}>
          <div style={{display: tab !== 0 ? 'none' : 'block'}}>
            {containers["Steering"].map(c => <ARTag key={c.ar_buttonid} cid={props.carid} bid={c.ar_buttonid} section={c.section} feature={c.feature} image={c.image} primarytags={props.primarytags} secondarydict={props.secondarydict}
            info={containers["carsSAR"][c.feature]} update={setData} getCurrent={data}/>)}
          </div>
          <div style={{display: tab !== 1 ? 'none' : 'block'}}>
            {containers["Instrument"].map(c => <ARTag key={c.ar_buttonid} cid={props.carid} bid={c.ar_buttonid} section={c.section} feature={c.feature} image={c.image} primarytags={props.primarytags} secondarydict={props.secondarydict}
            info={containers["carsIAR"][c.feature]} update={setData} getCurrent={data}/>)}
          </div>
          <div style={{display: tab !== 2 ? 'none' : 'block'}}>
            {containers["Entertainment"].map(c => <ARTag key={c.ar_buttonid} cid={props.carid} bid={c.ar_buttonid} section={c.section} feature={c.feature} image={c.image} primarytags={props.primarytags} secondarydict={props.secondarydict}
            info={containers["carsEAR"][c.feature]} update={setData} getCurrent={data}/>)}
          </div>   
        </Box> 
      </div>
    </MuiThemeProvider>
  );
}