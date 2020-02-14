import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import carpic from './2019-ford-explorer-s.webp';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";

const useStyles = makeStyles( theme => ({
    CarDiv: {
        borderRadius: 15,
        background: '#FFFFFF',
        margin: theme.spacing(2, 10, 2, 10),
        boxShadow: '0 3px 5px 2px #C2C1C1',
        "&:hover": {
            backgroundColor: '#A9CCED'
        }
    },
    CarImageBox: {
        marginLeft: theme.spacing(3),
    },
  }));

export default function Contact(props) {
    const classes = useStyles();
    console.log(props);
    return (
    <Box hover classes={{ hover: classes.hover }} className={classes.CarDiv} >
        <Link to={{pathname: "/carinfo", state: { id: props.carid }}}>
            <Box display="flex">
            <Box alignSelf="center" className={classes.CarImageBox}>
                <img src={carpic} alt="the car we are representing."/>
            </Box>
            <Box flexGrow={1}/>
            </Box>
        </Link>
    </Box>
    );
}
