import React from 'react';
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
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(make, model, year) {
  return { make, model, year};
}

const rows = [
  createData('Ford', 'Mustang', 2020),
  createData('Ford', 'Edge', 2020),
  createData('Ford', 'Escape', 2020),
  createData('Ford', 'Flex', 2017),
  createData('Ford', 'Explorer', 2019),
  createData('Ford', 'F-150', 2018),
  createData('Ford', 'Mustang', 2019),
  createData('Ford', 'Explorer', 2012),
  createData('Ford', 'Fiesta', 2016),
  createData('Ford', 'F-150', 2012),
];

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
            <StyledTableRow key={row.make} component={Link} to="/carinfo" hover               classes={{ hover: classes.hover }}
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