import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';



export default function Applications() {
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const [value, setValue] = useState('');
  const [data, setData] = useState(rows);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };




  return (
    <>
      <Container fixed>
        <h1> Applications </h1>

        <Grid container spacing={1} direction="row"
          alignItems="center"
          justify="space-between">
          <Grid item xs={3}>

            <TextField
              id="outlined-multiline-flexible"
              label="By Property"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>

            <TextField
              id="outlined-multiline-flexible"
              label="Submission Date"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>


            <TextField
              id="outlined-multiline-flexible"
              label="Location"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => alert('Clicked')}>Filter</Button>
          </Grid>
        </Grid>
        <br /><br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

    </>
  )
}
