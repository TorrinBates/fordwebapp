import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

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

function createData(make, model, year, id) {
  return { make, model, year, id};
}

var rows = [];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableRow: {
    "&$hover:hover": {
      backgroundColor: '#A9CCED'
    }
  },
  hover: {}
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [value, setValue] = useState(true); // integer state
  let gettable = async event => {
    try {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car?platform=web');
      let responseJson = await response.json();
      console.log(responseJson)
      const trows = [];
      for (var car of responseJson) 
      {
        trows.push(createData(car.make, car.model, car.year, car.carid));
      }
      rows = trows;
      setValue(false);
     } catch(error) {
      alert(error.message);
    }
  }
  if (value)
  {
    gettable();
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Make</StyledTableCell>
            <StyledTableCell align="center">Model&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Year&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.id} component={Link}   to={{pathname: "/carinfo", state: { id: row.id}}} hover               
              classes={{ hover: classes.hover }}
              className={classes.tableRow}>
              <StyledTableCell component="th" scope="row">
                {row.make}
              </StyledTableCell>
              <StyledTableCell align="center">{row.model}</StyledTableCell>
              <StyledTableCell align="right">{row.year}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}