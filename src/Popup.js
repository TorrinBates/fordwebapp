import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2, 0, 1, 0),
        display: 'inline-block',
        padding:0,
        minHeight: 0,
        minWidth: 0,
        borderColor: '#03315c',
        '&:hover': {
            backgroundColor: "transparent"
        },
    },
    help: {
      color: '#03315c',
      borderColor: '#03315c',
      '&:hover': {
        color: '#FFFFFF'
      },
    },
    img: {
      margin: theme.spacing(3, 3, 3, 3),
    }
  }));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, img, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <img src={img} className={classes.img} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen} className={classes.button}>
                <HelpOutlineIcon fontSize="large" className={classes.help}/>
            </IconButton>
            <SimpleDialog img={props.help} open={open} onClose={handleClose} />
        </div>
    );
}