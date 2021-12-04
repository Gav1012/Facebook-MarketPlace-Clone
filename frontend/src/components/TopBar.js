import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CategoryContext from './CategoryContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useHistory} from 'react-router';

/**
 *
 * @return {object}
 */
function TopBar() {
  // grabs current user from local storage
  const curr = localStorage.getItem('member');
  // used to swap between login and logout button
  const [visible, setVisible] = React.useState(curr ? true: false);
  // used for logging in on the desktop version
  const inputBoxes = (
    <form noValidate autoComplete="off">
      <TextField
        id='outlined-search'
        label='username'
      >search</TextField>
      <TextField
        id='outlined-search'
        label='password'
      >search</TextField>
    </form>
  );
  const history = useHistory();
  // removes from local storage and displays Login
  const logout = async () => {
    localStorage.removeItem('member');
    await history.go(0);
    setVisible(false);
  };
  // deals with conditional render
  const {dimensions} = useContext(CategoryContext);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='fixed' style={{zIndex: 1250}}>
        <Toolbar>
          <Typography variant='h6' component='div'>
            facebook
          </Typography>
          <div>
            {dimensions.width > 600 ? inputBoxes: null}
          </div>
          {visible ?
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
