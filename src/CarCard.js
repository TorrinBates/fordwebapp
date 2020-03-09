import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DefaultCar from './DefaultCar.png';
import { Auth } from 'aws-amplify';
import {useHistory} from 'react-router-dom';

const dashStyles = makeStyles(theme => ({
    Outer: {
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px #C2C1C1',
        margin: theme.spacing(5, 9, 2, 9),
        overflow: 'hidden'
    },
    CarDiv: {
        background: '#FFFFFF',
        display: 'inline-block',
        borderRight: '2px solid #C2C1C1',
    },
    Delete: {
        fontSize: 22,
        borderRadius: 0,
        borderStyle: 'none',
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#C91717',
        '&:hover': {
            backgroundColor: '#C91717',
            color: '#FFFFFF'
        }
    },
    Img: {
        margin: theme.spacing(0, 3, 0, 3),
    },
    Img2: {
        objectFit: 'contain',
        maxHeight: "235px",
        width: 'auto',
    },
    Txt: {
        fontSize: 22,
    },
    Text: {
        fontSize: 28,
        margin: theme.spacing(0, 3, 0, 3),
    },
    Box: {
        alignContent: 'center',
        alignItems: 'center'
    }
}));

export default function CarInfo(props) {
  
    const classes = dashStyles();
    let history = useHistory();

    let home = () => {
        history.push("/dashboard");
    };

    let DeleteCar = () => {

        Auth.currentSession().then(async res=>{
            let idToken = res.getIdToken();
            let jwt = idToken.getJwtToken();
      
            await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car?carid='+props.carid.toString(), {
              method: 'DELETE',
              headers: {
                'Authorization': jwt
            },
            }).then(function(response) {
                console.log(response)
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(function(response) {
                home();
            }).catch(function(error) {

            });
        })
    };

  return (  
    <Box className={classes.Outer}>
        <Box display="flex">
            <Box className={classes.CarDiv}>
                <Box className={classes.Img}>
                    <img src={props.icon} alt="the car we are representing." onError={(e)=>{e.target.onerror = null; e.target.src=DefaultCar}}/>
                </Box>
                <Button onClick={DeleteCar} variant="contained" startIcon={<DeleteIcon />} className={classes.Delete}>
                    Delete Car
                </Button>
            </Box>
            <Box flexGrow={1} className={classes.CarDiv}>
                <Box display="flex" className={classes.Box} >
                    <b className={classes.Text}>
                        Managing Media For
                    </b>
                    <p className={classes.Txt}>
                        {props.model}
                    </p>
                    <p className={classes.Txt}>
                        {props.year}
                    </p>
                </Box>
            </Box>
            <img className={classes.Img2} src="https://www.ford.com/cmslibs/content/dam/brand_ford/en_us/brand/legacy/marketing/billboard/20_FRD_EPR_400090_167.jpg/_jcr_content/renditions/cq5dam.web.1440.1440.jpeg"/>
        </Box>
    </Box>
  );
}