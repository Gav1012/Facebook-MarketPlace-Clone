import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CategoryContext from './CategoryContext';
import {useState} from 'react';
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
      <SearchIcon onClick={()=>onSearchClick(value)} />
      <TextField size='small' id='outlined-disabled' label='search'
        value={value} onChange={handleChange}>
      </TextField>
    </Box>);
}
