import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import CategoryContext from './CategoryContext';
import {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

/**
 * @return {object}
 */
export default function Search() {
  // grabs state for category
  const {setCategory} = useContext(CategoryContext);
  // grabs state for search
  const {setSearch} = useContext(CategoryContext);
  // grabs state for sub category
  const {setSub} = useContext(CategoryContext);
  // grabs state for filter
  const {setFilter} = useContext(CategoryContext);
  // creates state for the user input
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const onSearchClick = (e) => {
    setSub(undefined);
    setCategory(undefined);
    setFilter(undefined);
    setSearch(e);
  };
  // renders the search bar
  return (
    <Box sx={{my: .5}}>
      <FormControl style ={{width: '98%'}}>
        <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          title='search bar'
          value={value}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start"><SearchIcon
            title='search icon'
            onClick={()=>onSearchClick(value)} /></InputAdornment>}
          label="Search"
        />
      </FormControl>
    </Box>);
}
