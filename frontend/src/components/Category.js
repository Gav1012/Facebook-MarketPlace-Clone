import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CategoryContext from './CategoryContext';
import {useState} from 'react';

/**
 * @return {object}
 */
function Category({setSearch}) {
  const [value, setValue] = useState('');
  // const [searchSend, setSearchSend] = useState('');
  const handleChange = (e) => {
    // console.log(`Typed => ${e.target.value}`);
    // console.log('');
    setValue(e.target.value);
  };
  const onSearchClick = (e) => {
    // setSearchSend(e);
    setSearch(e);
    console.log(e);
    // wait(5000);
    // console.log(`To Send Value =>` + searchSend);
    // console.log('');
  };
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
          <SearchIcon onClick={()=>onSearchClick(value)} />
          <TextField size='small' id='outlined-disabled' label='search'
            value={value} onChange={handleChange}>
          </TextField>
        </div>
      </Box>
    </Container>
  );
}

export default Category;
