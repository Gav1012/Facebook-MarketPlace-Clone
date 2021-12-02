import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import CategoryContext from './CategoryContext';
import Filter from './Filter';
import BreadCrumbs from './BreadCrumbs';
import Search from './Search';
import {useContext} from 'react';
const drawerWidth = 500;
/**
 * @return {object}
 */
export default function PermanentDrawerLeft() {
  const {currCat, setCategory} = useContext(CategoryContext);
  const {setSub} = useContext(CategoryContext);
  const {catList} = useContext(CategoryContext);
  const {subList} = useContext(CategoryContext);
  const {setFilter} = useContext(CategoryContext);
  const {search, setSearch} = useContext(CategoryContext);
  console.log(subList);
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Drawer
        sx={{
          'width': drawerWidth,
          'flexShrink': 0,
          '& .MuiDrawer-paper': {
            'width': drawerWidth,
            'boxSizing': 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <div style={{margin: 15}} >
        <BreadCrumbs />
          {currCat ?
            <Typography variant="h4" gutterBottom component="div">
              {currCat}
            </Typography> :
              <Typography variant="h4" gutterBottom component="div">
              Marketplace
            </Typography> }
          {search.length > 0 ?
            <Typography variant="h4" gutterBottom component="div">
              Search results
            </Typography> : ''}
        </div>
        <Divider />
        <div style={{margin: 10}}>
          <Search />
          {currCat? <Divider /> : ''}
          {currCat?
            <Typography variant="h5" gutterBottom component="div">
              Filters
            </Typography> : ''}
          <Filter />
        </div>
        <Divider />
        <div style={{margin: 10}}>
          <Typography variant="h5" gutterBottom component="div">
            Categories
          </Typography>
        </div>
        <List>
          {catList.map((cat, index) => (
            <ListItem
              label={cat.names}
              key={cat.names}
              onClick={()=>{
                setCategory(cat.names);
                setSub(undefined);
                setFilter(undefined);
                setSearch('');
              }}
            >
              <ListItemText primary={cat.names} />
            </ListItem>))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
