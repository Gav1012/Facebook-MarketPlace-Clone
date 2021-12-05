import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CategoryContext from './CategoryContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';

/**
 * @return {object}
 */
function Login() {
  // function is directly inspired by books example
  // provided by Professor Harrison
  // updates state for when user types into input box
  const [user, setUser] = React.useState({email: '', password: ''});
  // updates state for displaying eror when email/password is incorrect
  const [error, setError] = React.useState('');
  // used to update the log out button to appear after logging in
  const {setVisible} = useContext(CategoryContext);
  // used to go back to the main home page and goto new account page
  const history = useHistory();
  // from example code provided by Professor Harrison
  const handleInputChange = (event) => {
    // grabs data from input boxes
    const {value, name} = event.target;
    // grabs from the user state
    const u = user;
    // u[name] is the actual input
    u[name] = value;
    // sets the state defined above
    setUser(u);
  };
  // handles when user presses login button
  // fetch login based on books example provided by Professor Harrison
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
        // puts user into the localstorage
        localStorage.setItem('member', JSON.stringify(json));
        // log out button become visible
        setVisible(true);
        // goto to home page
        history.push('/');
      })
      .catch((error) => {
        // displays error for incorrect email/password
        setError(`${error.statusText} - wrong email or password`);
      });
  };
  // render of login page inspired by books example
  // provided by Professor Harrison
  // renders the login page when selected
  return (
    <form onSubmit={onSubmit}>
      <AppBar sx={{position: 'fixed'}}>
        <Toolbar>
          <Typography variant='h6'>Login Screen</Typography>
          <IconButton
            sx={{marginLeft: 'auto'}}
            onClick={()=>history.push('/')}
            aria-label='close'
          >
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
          title='email'
          label='email'
          name='email'
          onChange={handleInputChange}
          required
          sx={{my: '2%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          title='password'
          label='name'
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
        <Button
          variant='contained'
          href='/newaccount'
          sx={{width: '300px'}}>
          New User
        </Button>
        <Typography variant='subtitle1'>
          {error}
        </Typography>
      </Box>
    </form>
  );
}

export default Login;
