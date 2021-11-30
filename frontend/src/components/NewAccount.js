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
function NewAccount() {
  const history = useHistory();
  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   // checks with db that user exists
  //   fetch('/v0/member', {
  //     method: 'POST',
  //     body: JSON.stringify(user),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw res;
  //       }
  //       return res.json();
  //     })
  //     .then((json) => {
  //       localStorage.setItem('member', JSON.stringify(json));
  //       history.push('/');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert('Error logging in, please try again');
  //     });
  // };
  return (
    <form>
      <AppBar sx={{position: 'fixed'}}>
        <Toolbar>
          <Typography variant='h6'>Create Account</Typography>
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
          // onChange={handleInputChange}
          required
          sx={{my: '2%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          label='password'
          name='password'
          // onChange={handleInputChange}
          required
          sx={{my: '3%', width: '300px'}}
        />
        <Button
          variant='contained'
          type='submit'
          sx={{my: '3%', width: '300px'}}>
          Create Account
        </Button>
        <Button
          variant='contained'
          href='/Login'
        >
          Already have an account?
        </Button>
      </Box>
    </form>
  );
}

export default NewAccount;
