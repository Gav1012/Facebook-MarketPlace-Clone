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
  const {setCategory} = useContext(CategoryContext);
  const {setSearch} = useContext(CategoryContext);
  const {setSub} = useContext(CategoryContext);
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const onSearchClick = (e) => {
    setSub(undefined);
    setCategory(undefined);
    setSearch(e);
  };
  return (
    <Box sx={{my: .5}}>
      <FormControl style ={{width: '98%'}}>
        <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={value}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start"><SearchIcon
            onClick={()=>onSearchClick(value)} /></InputAdornment>}
          label="Search"
        />
      </FormControl>
    </Box>);
}
