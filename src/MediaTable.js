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

function createData(name, type, primarytag, secondarytag) {
  return {name, type, primarytag, secondarytag};
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

export default function MediaTable(props) {
  const classes = useStyles();
  const [value, setValue] = useState(true);
  let gettable = async event => {
    try {
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car/media?carid='+props.carid.toString());
      let responseJson = await response.json();
      const trows = [];
      for (var resource of responseJson) 
      {
        trows.push(createData(resource.name, resource.type, resource.primarytag, resource.secondarytag, resource.mediaid));
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
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="customized table">
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
              <StyledTableCell align="center">{row.primarytag}</StyledTableCell>
              <StyledTableCell align="center">{row.secondarytag}</StyledTableCell>
              <StyledTableCell>
                <IconButton>
                  <DeleteIcon/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}