import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


/**
 * @return {object}
 */
function Category() {
  return (
    <Container>
      <Box sx={{my: 2}}>
        <Stack direction="row" spacing={1}>
          <Chip label='Sell' onClick={()=>console.log('sell button')} />
          <Chip label='Categories' variant='outlined'
            onClick={()=>console.log('category button')} />
          <Chip label='Vehicles' variant='outlined'
            onClick={()=>console.log('Vehicle button')} />
          <Chip label='Apparel' variant='outlined'
            onClick={()=>console.log('apparel button')} />
        </Stack>
        <form noValidate autoComplete="off">
          <TextField
            label="search"
            variant="standard"
            fullWidth
          ></TextField>
        </form>
      </Box>
    </Container>
  );
}

export default Category;
