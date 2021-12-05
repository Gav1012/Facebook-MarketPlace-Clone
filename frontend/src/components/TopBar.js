import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CategoryContext from './CategoryContext';
import Button from '@mui/material/Button';

/**
 * @return {object}
 */
function TopBar() {
  // grabs current user from local storage
  const curr = localStorage.getItem('member');
  // used to swap between login and logout button
  const {visible, setVisible} = useContext(CategoryContext);
  // logout directly inspired by code provided by Professor Harrison
  // removes from local storage and displays Login
  const logout = () => {
    setVisible(false);
    localStorage.removeItem('member');
  };
  // renders the topbar of the homepage and buttons used for login
  // formatting of the Appbar based on example from MUI
  // https://codesandbox.io/s/hnj12?file=/demo.js
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
