import React, { useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Select from 'react-select';

const IOSSwitch = withStyles(theme => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#0055A5',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#0055A5',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
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

const useStyles = makeStyles(theme => ({
    Parent: {
        marginBottom: theme.spacing(1),
    },
    Img: {
        marginRight: theme.spacing(2),
    },
    Txt: {
        width: '17%',
        fontSize: 18,
        marginRight: theme.spacing(2),
    },
    Dropdown: {
        width: '23%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
}));

const steeringLocos = [{ value: "Right Top", label: "Right Top"},{ value: "Right Middle", label: "Right Middle"},{ value: "Right Bottom", label: "Right Bottom"},
{ value: "Left Top", label: "Left Top"},{ value: "Left Middle", label: "Left Middle"},{ value: "Left Bottom", label: "Left Bottom"}];
const instrumentLocos = [{ value: "Video", label: "Video" }];
const entertainmentLocos = [{ value: "Video", label: "Video" },{ value: "FAQ", label: "FAQ" }];

export default function Tag(props) {

  var secondarydict = props.secondarydict;
  var locations;
  if (props.section === "Steering Wheel")
  {
    locations = steeringLocos;
  }
  else if (props.section === "Entertainment System")
  {
    locations = instrumentLocos;
  }
  else if (props.section === "Instrument Cluster")
  {
    locations = entertainmentLocos;
  }
  const classes = useStyles();
  const [value, setValue] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [primaryId, setPrimaryId] = useState(null);
  const [secondaryId, setSecondaryId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [secondarytags, setsecondarytags] = useState([]);


  let updateDict = (key,value) => {
    var copy = props.getCurrent;
    copy[props.feature] = {"carId": props.cid, "enabled": enabled, "location": locationId, "primaryTag": primaryId,
     "secondaryTag": secondaryId, "arButtonId": props.bid};
    copy[props.feature][key] = value;
    props.update(copy);
  };
  const handleChange = event => {
    var temp = !enabled;
    setEnabled(temp);
    updateDict("enabled",temp);
  };
  let selectPrimary = (opt) => {
    setPrimaryId(opt);
    if (opt != null)
    {
      setsecondarytags(secondarydict[opt.value]);
    }
    else
    {
      setsecondarytags([]);
    }
    setSecondaryId(null);
    updateDict("primaryTag", opt);
  }
  let selectSecondary = (opt) => {
    setSecondaryId(opt);
    updateDict("secondaryTag", opt);
  }
  let selectLocation = (opt) => {
    setLocationId(opt);
    updateDict("location", opt);
  }
  if (value)
  {
    if (props.info != null)
    {
      setEnabled(props.info.enabled);
      for (var tag in props.primarytags)
      {
        if (props.primarytags[tag]["value"] === props.info.primarytag)
        {
          setPrimaryId(props.primarytags[tag]);
          if (props.primarytags[tag] != null)
          {
            setsecondarytags(secondarydict[props.primarytags[tag].value]);
          }
          else
          {
            setsecondarytags([]);
          }
          setSecondaryId(null);
        }
      }
      if (props.info.secondarytag !== null)
      {
        for (var tag in secondarytags)
        {
          if (secondarytags[tag]["value"] === props.info.secondarytag)
          {
            selectSecondary(secondarytags[tag]);
          }
        }
      }
      setLocationId({ value: props.info.location, label: props.info.location});
    }
    setValue(false);
  }

  return (
    !value && 
    <Box display="flex" alignItems="center" className={classes.Parent}>
      <img width="50" height="50" src={props.image} className={classes.Img} alt="AR Button."/>
      <b className={classes.Txt}>{props.feature}:</b>
      <Box flexGrow={1}/>
      <IOSSwitch checked={enabled} onChange={handleChange} name="enabledSlider" />
      <Select options={props.primarytags} onChange={opt => selectPrimary(opt)} value={primaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
      <Select options={secondarytags} onChange={opt => selectSecondary(opt)} value={secondaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
      <Select options={locations} onChange={opt => selectLocation(opt)} value={locationId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
    </Box>
  );
}