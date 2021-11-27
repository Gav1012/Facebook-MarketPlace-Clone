import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CategoryContext from './CategoryContext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {useState} from 'react';
import Link from '@mui/material/Link';

/**
 * @return {object}
 */
function Category({setSearch}) {
  // uses context to set the category to be viewed when clicked
  const {currCat, setCategory} = useContext(CategoryContext);
  // sets state for when search box is used
  const [value, setValue] = useState('');
  // const [searchSend, setSearchSend] = useState('');
  // handles when listing changes
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // used for when the search iconis clicked
  const onSearchClick = (e) => {
    setSearch(e);
  };

  return (
    <Container>
      <Box sx={{my: 2}}>
        {currCat ? <Breadcrumbs>
          <Link onClick={()=>setCategory(undefined)} color='inherit'
            underline='hover'>
            Main Menu
          </Link>
        </Breadcrumbs>: <div>NO CATEGORY SELECTED</div>}

        <Stack direction="row" spacing={1}>
          <Chip label='Sell' onClick={()=>setCategory('bruh')} />
          <Chip label='Categories' variant='outlined'
            onClick={()=>setCategory(undefined)} />
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
