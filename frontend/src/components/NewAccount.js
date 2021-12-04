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
  return (
    <div>
      <AppBar sx={{position: 'fixed'}}>
        <Toolbar>
          <Typography variant='h6'>New Account</Typography>
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
          label='name'
          name='name'
          sx={{my: '2%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          label='email'
          name='email'
          sx={{my: '2%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          label='password'
          name='password'
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
          sx={{my: '3%', width: '300px'}}
        >
          Already have an account?
        </Button>
      </Box>
    </div>
  );
}

export default NewAccount;
