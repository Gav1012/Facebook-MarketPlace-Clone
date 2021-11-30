import React from 'react';
import {useHistory} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';

/**
 * @return {object}
 */
function Login() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useHistory();
  // from example code provided by Professor Harrison
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    // grabs from the user state
    const u = user;
    // u[name] is the actual input
    u[name] = value;
    setUser(u);
  };
  // handles when user presses login button
  // from example code provided by Professor Harrison
  const onSubmit = (event) => {
    event.preventDefault();
    // checks with db that user exists
    fetch('/v0/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('member', JSON.stringify(json));
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <AppBar sx={{position: 'fixed'}}>
        <Toolbar>
          <Typography variant='h6'>Login Screen</Typography>
          <IconButton sx={{marginLeft: 'auto'}} onClick={()=>history.push('/')}>
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
          label='email'
          name='email'
          onChange={handleInputChange}
          required
          sx={{my: '2%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          label='password'
          name='password'
          onChange={handleInputChange}
          required
          sx={{my: '3%', width: '300px'}}
        />
        <Button
          variant='contained'
          type='submit'
          sx={{my: '3%', width: '300px'}}>
          Login
        </Button>
        <Button variant='contained' sx={{width: '300px'}}>
          New User
        </Button>
      </Box>
    </form>
  );
}

export default Login;
