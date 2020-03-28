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
        fontSize: 18,
        marginRight: theme.spacing(2),
    },
    Dropdown: {
        width: theme.spacing(25),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
}));

const mediaOptions = [{ value: "Video", label: "Video" },{ value: "FAQ", label: "FAQ" }];

export default function Tag(props) {
    const classes = useStyles();
    const [enabled, setEnabled] = useState(false);
    const [primaryId, setPrimaryId] = useState(null);
    const [secondaryId, setSecondaryId] = useState(null);
    const handleChange = event => {
        setEnabled(!enabled);
    };
    let selectSecondary = (opt) => {
        setSecondaryId(opt);
    }

    return (
        <Box display="flex" alignItems="center" className={classes.Parent}>
            <img width="50" height="50" src={props.image} className={classes.Img} alt="AR Button Image."/>
            <b className={classes.Txt}>{props.feature}:</b>
            <Box flexGrow={1}/>
            <IOSSwitch checked={enabled} onChange={handleChange} name="checkedB" />
            <Select options={mediaOptions} onChange={opt => selectSecondary(opt)} value={secondaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
            <Select options={mediaOptions} onChange={opt => selectSecondary(opt)} value={secondaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
            <Select options={mediaOptions} onChange={opt => selectSecondary(opt)} value={secondaryId} isClearable={true} styles={customStyles} className={classes.Dropdown}/>
        </Box>
    );
}