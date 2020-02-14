import React, { useState } from 'react';
import Car from './Car'
import Box from '@material-ui/core/Box';

function createData(make, model, year, carid) {
  return { make, model, year, carid};
}

var cars = [];

export default function CustomizedTables() {
  const [value, setValue] = useState(true);
  let gettable = async event => {
    try {
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car?platform=web');
      let responseJson = await response.json();
      const tcars = [];
      for (var car of responseJson) 
      {
        tcars.push(createData(car.make, car.model, car.year, car.carid));
      }
      cars = tcars;
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
    <Box>
      {cars.map(c => <Car key={c.carid} make={c.make} model={c.model} year={c.year} carid={c.carid}/>)}
    </Box>
  );
}