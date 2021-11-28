import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CategoryContext from './CategoryContext';
import Dialog from '@mui/material/Dialog';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// grabs all the listings and specific ones depending on other inputs
const fetchCategory = (setSubCat) => {
  // fetches the listings based on above modifications
  fetch('/v0/listings/category', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setSubCat(json);
    });
};

/**
 * @return {object}
 */
function Category({setSearch}) {
  // uses context to set the category to be viewed when clicked
  const {currCat, setCategory} = useContext(CategoryContext);
  const {currSub, setSub} = useContext(CategoryContext);
  console.log(currSub);
  // sets state for when search box is used
  const [value, setValue] = useState('');
  const [subCat, setSubCat] = React.useState();
  const [open, setOpen] = React.useState(false);
  // const [searchSend, setSearchSend] = useState('');
  // handles when listing changes
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // used for when the search iconis clicked
  const onSearchClick = (e) => {
    setSub(undefined);
    setCategory(undefined);
    setSearch(e);
  };
  const handleClickOpen = () => {
    console.log('we got to handleclick open');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    fetchCategory(setSubCat);
  }, []);
  console.log('subCat: ', subCat);
  let found = undefined;
  const temp = [];
  // checks that a category was selected
  if (currCat) {
    // finds the main category
    found = subCat.find((element) => element.names === currCat);
    // iterates through all the listings
    subCat.forEach((element) => {
      console.log(element);
      // checks for the subcategories of current main category
      if (element.parent === found.id) {
        console.log('found subcat: ', element.names);
        temp.push(element);
      }
    });
  }
  console.log(open);
  return (
    <Container>
      <Box sx={{my: 2}}>
        <Stack direction="row" spacing={1}>
          {currCat ?
            <Box>
              {temp.map((sub) => (
                <Chip
                  label={sub.names}
                  key={sub.names}
                  onClick={()=>{
                    setSub(sub.names);
                    setSearch('');
                  }}
                />
              ))}
            </Box>:
            <Box>
              <Chip label='Sell' onClick={()=>setCategory(undefined)} />
              <Chip label='Categories' onClick={handleClickOpen} />
              <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar sx={{position: 'relative'}}>
                  <Toolbar>
                    <Typography>Categories</Typography>
                    <IconButton sx={{marginLeft: 'auto'}} onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <List>
                  <ListItem
                    button
                    key={'Vehicles'}
                    onClick={()=>{
                      setCategory('Vehicles');
                      handleClose();
                      setSearch('');
                    }}
                  >
                    <ListItemText primary={'Vehicles'} />
                  </ListItem>
                  <ListItem
                    button
                    key={'Apparel'}
                    onClick={()=>{
                      setCategory('Apparel');
                      handleClose();
                      setSearch('');
                    }}
                  >
                    <ListItemText primary={'Apparel'} />
                  </ListItem>
                </List>
              </Dialog>
            </Box>
          }
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
