import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CategoryContext from './CategoryContext';
import BreadCrumbs from './BreadCrumbs';
import {useContext} from 'react';
const drawerWidth = 400;
/**
 * @return {object}
 */
export default function PermanentDrawerLeft() {
  const {currCat, setCategory} = useContext(CategoryContext);
  const {dimensions} = useContext(CategoryContext);
  const {setSub} = useContext(CategoryContext);
  const {catList} = useContext(CategoryContext);
  const {subList} = useContext(CategoryContext);
  const {setSearch} = useContext(CategoryContext);
  console.log(subList);
  console.log(currCat);
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
        {dimensions.width > 599? <BreadCrumbs /> : ''}
        <Divider />
        <List>
        {catList.map((cat) => (
                <ListItem
                  label={cat.names}
                  key={cat.names}
                  onClick={()=>{
                    setCategory(cat.names);
                    setSub(undefined);
                    setSearch('');
                  }}
                > <ListItemText primary={cat.names} />
                </ListItem>))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
