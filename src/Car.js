import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import DefaultCar from './DefaultCar.png';

const useStyles = makeStyles( theme => ({
    CarDiv: {
        borderRadius: 15,
        background: '#FFFFFF',
        margin: theme.spacing(2, 10, 2, 10),
        boxShadow: '0 3px 5px 2px #C2C1C1',
        "&:hover": {
            backgroundColor: '#C2C1C1'
        }
    },
    CarImageBox: {
        marginLeft: theme.spacing(3),
    },
    CarTextBox: {
        marginLeft: theme.spacing(15),
    },
    Car2TextBox: {
        marginRight: theme.spacing(15),
    },
    CarLink: {
        textDecoration: 'none',
    },
    CarText: {
        color: '#000000',
        fontSize: '1.5vw',
    }
  }));

/*
Car component thats shown on the dashboard
*/
export default function Car(props) {
    const classes = useStyles();
    return (
    <Box classes={{ hover: classes.hover }} className={classes.CarDiv} >
        <Link className={classes.CarLink} to={{pathname: "/carinfo", state: { carid: props.carid, icon: props.icon, year: props.year, model: props.model, make: props.make}}}>
            <Box display="flex">
                <Box alignSelf="center" className={classes.CarImageBox}>
                    <img src={props.icon} alt="the car we are representing." onError={(e)=>{e.target.onerror = null; e.target.src=DefaultCar}}/>
                </Box>
                <Box alignSelf="center" className={classes.CarTextBox}>
                    <p className={classes.CarText}>
                        <b>Make:</b> {props.make}
                    </p>
                </Box>
                <Box flexGrow={1}/>
                <Box alignSelf="center">
                    <p className={classes.CarText}>
                        <b>Model:</b> {props.model}
                    </p>
                </Box>
                <Box flexGrow={1}/>
                <Box alignSelf="center" className={classes.Car2TextBox}>
                    <p className={classes.CarText}>
                        <b>Year:</b> {props.year}
                    </p>
                </Box>
            </Box>
        </Link>
    </Box>
    );
}
