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
import Button from '@mui/material/Button';
// grabs all the listings and specific ones depending on other inputs
const fetchCategory = (setCatList, currCat) => {
  if (currCat === undefined) {
  // console.log('Were inside FetchCategory');
  // fetches the listings based on above modifications
  fetch('/v0/listings/category', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      // console.log('Response for fetchCategory Given');
      // console.log(response);
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setCatList(json);
      // console.log('cat');
      // console.log(json);
    })
    .catch(() => {
    });
};
};
const fetchSub = (setSubList, currCat) => {
  if (currCat) {
  // console.log('Were inside fetchSub');
    // fetches the listings based on above modifications
    fetch('/v0/listings/category?sub=' + currCat, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // console.log('Response for fetchSub Given');
        // console.log(response);
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setSubList(json);
      })
      .catch(() => {
      });
  };
};
/**
 * @return {object}
 */
function Category() {
  const {setSearch} = useContext(CategoryContext);
  const {setFilter} = useContext(CategoryContext);
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
      setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    fetchCategory(setCatList, currCat);
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
                  aria-label={sub.names}
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
              <Button sx={{mb: .25, mr: 1}} label='Sell' href='/CreateListing'
                style={{backgroundColor: '#00000014', borderRadius: '35%',
                height: '33px', textTransform: 'none', color: 'Black'}}
              >
              Sell
              </Button>
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
                    {catList.map((cat, index) => (
                      <ListItem
                        label={cat.names}
                        key={cat.names}
                        onClick={()=>{
                          setCategory(cat.names);
                          setSub(undefined);
                          setSearch('');
                          setFilter(undefined);
                          handleClose();
                        }}
                      >
                        <ListItemText primary={cat.names} />
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
