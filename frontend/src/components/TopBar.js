import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CategoryContext from './CategoryContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Login from './Login';

/**
 *
 * @return {object}
 */
function TopBar() {
  // grabs current user from local storage
  const curr = localStorage.getItem('member');
  // sets the state of login screen being opened
  const [open, setOpen] = React.useState(false);
  // used to swap between login and logout button
  const [visible, setVisible] = React.useState(curr ? true: false);
  // opens the login screen
  const handleClickOpen = () => {
    setOpen(true);
  };
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
  // removes from local storage and displays Login
  const logout = () => {
    localStorage.removeItem('member');
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
              style={{color: 'white', marginLeft: 'auto'}}>
            Log out
            </Button>:
            <Button
              style={{color: 'white', marginLeft: 'auto'}}
              onClick={handleClickOpen}
            >Login
            </Button>}
          <Box>
            <Login open={open} setOpen={setOpen} setVisible={setVisible}/>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default TopBar;
