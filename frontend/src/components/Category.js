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


const fetchCategory = (setCatList) => {
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
      setCatList(json);
    });
};
const fetchSub = (setSubList, currCat) => {
  console.log('we get here');
  console.log(currCat);
  if (currCat) {
  console.log('we never get here');
  // fetches the listings based on above modifications
  fetch('/v0/listings/category?sub=' + currCat, {
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
      setSubList(json);
    });
  }
};

/**
 * @return {object}
 */
function Category({setSearch}) {
  // uses context to set the category to be viewed when clicked
  const {currCat, setCategory} = useContext(CategoryContext);
  const {setSub} = useContext(CategoryContext);
  const {catList, setCatList} = useContext(CategoryContext);
  const {subList, setSubList} = useContext(CategoryContext);
  console.log(catList);
  console.log(subList);
  console.log('inside category');
  // sets state for when search box is used
  const [value, setValue] = useState('');
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
    fetchCategory(setCatList);
  }, []);
  React.useEffect(() => {
    fetchSub(setSubList, currCat);
  }, [currCat]);
  return (
    <Container>
      <Box>
        <Stack direction="row" spacing={1}>
          {currCat ?
            <Box sx={{my: 1}}>
              {subList.map((sub) => (
                <Chip
                  sx={{mb: .25, mr: 1}}
                  label={sub.names}
                  key={sub.names}
                  onClick={()=>{
                    setSub(sub.names);
                    setSearch('');
                  }}
                />
              ))}
            </Box>:
            <Box sx={{my: 1}}>
              <Chip sx={{mb: .25, mr: 1}} label='Sell'
                onClick={()=>setCategory(undefined)} />
              <Chip sx={{mb: .25}} label='Categories'
                onClick={handleClickOpen} />
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
                {catList.map((cat) => (
                <ListItem
                  label={cat.names}
                  key={cat.names}
                  onClick={()=>{
                    setCategory(cat.names);
                    setSub(undefined);
                    setSearch('');
                    handleClose();
                  }}
                > <ListItemText primary={cat.names} />
              </ListItem>))}
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
        <Box sx={{my: .5}}>
          <SearchIcon onClick={()=>onSearchClick(value)} />
          <TextField size='small' id='outlined-disabled' label='search'
            value={value} onChange={handleChange}>
          </TextField>
        </Box>
      </Box>
    </Container>
  );
}

export default Category;
