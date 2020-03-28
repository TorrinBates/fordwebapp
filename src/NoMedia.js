import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles( theme => ({
    CarDiv: {
        borderRadius: 8,
        backgroundColor: '#8b8c8b',
        boxShadow: '0 0 3px 1px #8b8c8b',
        margin: theme.spacing(2, 0, 2, 0),
        height: theme.spacing(20),
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Txt: {
        fontSize: 20,
        color: '#FFFFFF',
        margin: theme.spacing(0, .5, 0, 1),
    },
    Ico: {
        color: '#FFFFFF',
        margin: theme.spacing(0, 1, 0, .5),
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
  }));

export default function Contact() {
    const classes = useStyles();
    return (
    <Box display="flex" justifyContent="center">
        <Box className={classes.CarDiv}>
            <FolderOpenIcon fontSize="large" className={classes.Ico}/>
            <b className={classes.Txt} >No Media Currently</b>
        </Box>
    </Box>
    );
}