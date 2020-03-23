import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NoMedia from './NoMedia'
import { Auth } from 'aws-amplify';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#0055A5',
    color: theme.palette.common.white,
    fontSize: 24,
  },
  body: {
    fontSize: 22,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, type, primarytagname, secondarytagname, mediaid) {
  return {name, type, primarytagname, secondarytagname, mediaid};
}

var rows = [];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  cont: {
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px #C2C1C1',
  },
  tableRow: {
    "&$hover:hover": {
      backgroundColor: '#A9CCED'
    }
  },
  hover: {}
});

export default function MediaTable(props) {
  const classes = useStyles();
  const [value, setValue] = useState(true);
  let gettable = async event => {
    try {
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car/media?tagnames=true&carid='+props.carid.toString());
      let responseJson = await response.json();
      const trows = [];
      for (var resource of responseJson) 
      {
        trows.push(createData(resource.name, resource.type, resource.primarytagname, resource.secondarytagname, resource.mediaid));
      }
      rows = trows;
      setValue(false);
     } catch(error) {
      alert(error.message);
    }
  }
  let deleteMedia = (id) => {
    Auth.currentSession().then(async res=>{
      let idToken = res.getIdToken();
      let jwt = idToken.getJwtToken();

      await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/media?mediaid='+id.toString(), {
        method: 'DELETE',
        headers: {
          'Authorization': jwt
        },
      }).then(function(response) {
        if (!response.ok) { throw Error(response.statusText); }
        return response;
      }).then(function(response) {
        setValue(true);
      }).catch(function(error) {
        alert(error.message);
      });
    })
  }
  function EmptyMedia() {
    if (rows.length === 0) {
      return <NoMedia/>;
    }
    return <div></div>
  }
  if (value)
  {
    gettable();
  }

  return (
    !value &&
    <TableContainer component={Paper} className={classes.cont}>
      <Table className={classes.table} aria-label="Car Media Table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Media</StyledTableCell>
            <StyledTableCell align="center">Type&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Primary Tag&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Secondary Tag&nbsp;</StyledTableCell>
            <StyledTableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.mediaid}
              className={classes.tableRow}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.primarytagname}</StyledTableCell>
              <StyledTableCell align="center">{row.secondarytagname}</StyledTableCell>
              <StyledTableCell>
                <IconButton onClick={() => { deleteMedia(row.mediaid); }}>
                  <DeleteIcon/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <EmptyMedia/>
    </TableContainer>
  );
}