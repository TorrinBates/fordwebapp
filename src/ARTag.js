import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export default function Tag(props) {
    return (
        <Box>
            {props.feature}
            <img width="50" height="50" src={props.image} alt="the button we are representing."/>
        </Box>
    );
}