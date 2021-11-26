import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CategoryContext from './CategoryContext';


/**
 * @return {object}
 */
function Category() {
  const {setCategory} = useContext(CategoryContext);
  return (
    <Container>
      <Box sx={{my: 2}}>
        <Stack direction="row" spacing={1}>
          <Chip label='Sell' onClick={()=>setCategory('bruh')} />
          <Chip label='Categories' variant='outlined'
            onClick={()=>console.log('category button')} />
          <Chip label='Vehicles' variant='outlined'
            onClick={()=>setCategory('Vehicles')} />
          <Chip label='Apparel' variant='outlined'
            onClick={()=>setCategory('Apparel')} />
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
