import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CategoryContext from './CategoryContext';
// import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';

/**
 *
 * @return {object}
 */
function TopBar() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const temp = (
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
  const loginScreen = (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar sx={{position: 'relative', zIndex: 1300}}>
        <Toolbar>
          <Typography variant='h6'>Login Screen</Typography>
          <IconButton sx={{marginLeft: 'auto'}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{pl: '12%', my: '50%'}}>
        <Box sx={{pl: '38%'}}>
          <AccountCircleIcon />
        </Box>
        <TextField
          id='outlined-search'
          label='username'
          sx={{my: '2%', width: '300px'}}
        >USERNAME</TextField>
        <TextField
          id='outlined-search'
          label='password'
          sx={{my: '3%', width: '300px'}}
        >PASSWORD</TextField>
        <Button variant='contained' sx={{my: '3%', width: '300px'}}>
          Login
        </Button>
        <Button variant='contained' sx={{width: '300px'}}>
          New User
        </Button>
      </Box>
    </Dialog>
  );
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
            {dimensions.width > 600 ? temp: null}
          </div>
          <Button
            style={{color: 'white', marginLeft: 'auto'}}
            onClick={handleClickOpen}
          >Login
          </Button>
          <Box>
            {loginScreen}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default TopBar;
