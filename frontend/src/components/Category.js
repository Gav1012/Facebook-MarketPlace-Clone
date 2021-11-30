import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CategoryContext from './CategoryContext';
import Dialog from '@mui/material/Dialog';
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
  if (currCat) {
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
  // grabs context for setting the subcategories
  const {setSub} = useContext(CategoryContext);
  // grabs context for category list
  const {catList, setCatList} = useContext(CategoryContext);
  // grabs context for subcat list
  const {subList, setSubList} = useContext(CategoryContext);
  // grabs the current dimensions of the window
  const {dimensions} = useContext(CategoryContext);
  // sets state for when search box is used
  const [open, setOpen] = React.useState(false);
  // handles when listing changes
  const handleClickOpen = () => {
    if (dimensions.width < 600) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    fetchCategory(setCatList);
  }, [setCatList]);
  React.useEffect(() => {
    fetchSub(setSubList, currCat);
  }, [setSubList, currCat]);
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
            <Box sx={{my: 1}}
              style={dimensions.width > 599? {display: 'none'} : {}}>
              <Chip sx={{mb: .25, mr: 1}} label='Sell'
                onClick={()=>setCategory(undefined)} />
              <Chip sx={{mb: .25}} label='Categories'
                onClick={handleClickOpen} />
              {dimensions.width < 600?
                <Dialog fullScreen open={open} onClose={handleClose}>
                  <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                      <Typography>Categories</Typography>
                      <IconButton
                        sx={{marginLeft: 'auto'}} onClick={handleClose}>
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
                  </List>
                </Dialog> : ''}
            </Box>
          }
        </Stack>
      </Box>
    </Container>
  );
}

export default Category;
