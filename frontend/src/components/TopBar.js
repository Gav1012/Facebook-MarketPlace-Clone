import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CategoryContext from './CategoryContext';
import Button from '@mui/material/Button';
// import {useHistory} from 'react-router';

/**
 * @return {object}
 */
function TopBar() {
  // grabs current user from local storage
  const curr = localStorage.getItem('member');
  // used to swap between login and logout button
  const {visible, setVisible} = useContext(CategoryContext);
  // used for logging in on the desktop version
  // const history = useHistory();
  // removes from local storage and displays Login
  console.log('visible val: ', visible);
  const logout = () => {
    setVisible(false);
    console.log('removing from local storage');
    localStorage.removeItem('member');
    console.log('updating state visible');
  };
  // deals with conditional render
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='fixed' style={{zIndex: 1250}}>
        <Toolbar>
          <Typography variant='h6' component='div'>
            facebook
          </Typography>
          {visible || curr ?
            <Button
              onClick={logout}
              style={{color: 'white', marginLeft: 'auto'}}
            >
            Log out
            </Button>:
            <Button
              style={{color: 'white', marginLeft: 'auto'}}
              href='/Login'
            >Login
            </Button>}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default TopBar;
