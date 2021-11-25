import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
// import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

/**
 *
 * @return {object}
 */
function TopBar() {
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
  const winDims = () => ({
    width: window.innerWidth,
  });
  // deals with conditional render
  const [dimensions, setDimensions] = useState(winDims);
  useEffect(() => {
    const handleResize = () => {
      setDimensions(winDims);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' component='div'>
            facebook
          </Typography>
          <div>
            {dimensions.width > 600 ? temp: null}
          </div>
          <Button
            style={{color: 'white', marginLeft: 'auto'}}
            onClick={()=>console.log('login button')}
          >Login
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default TopBar;
