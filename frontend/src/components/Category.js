import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


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
        </Stack>
        <div>
          <SearchIcon />
          <TextField size='small' id='outlined-disabled' label='search'>
          </TextField>
        </div>
      </Box>
    </Container>
  );
}

export default Category;
