import React from 'react';
import {useHistory} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import {Button, Select} from '@mui/material';
// import {MenuItem} from '@mui/material';
import {useState} from 'react';
import {TextareaAutosize} from '@mui/base';
import {InputLabel} from '@mui/material';
import {MenuItem} from '@mui/material';
// import {useContext} from 'react';
// import CategoryContext from './CategoryContext';

/**
 *
 * @return {x}
 */
function CreateListing() {
  const history = useHistory();
  const [newListing, setListing] = useState({'listing': {}});
  const [currCat, setCat] = useState('');
  const bearerToken = localStorage.getItem('member') ?
    JSON.parse(localStorage.getItem('member')).accessToken : '';

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const newListingCopy = newListing;
    if (name === 'title' ||
      name === 'content' ||
      name === 'summary' ||
      name === 'price') {
      newListing['listing'][name] = value;
    } else if (name === 'images') {
      const newVal = value.split('\n');
      const imgArr = [];
      for (let i = 0; i < newVal.length; i++) {
        imgArr.push({'link': newVal[i]});
      }
      newListing['listing'][name] = imgArr;
    } else {
      newListing[name] = value;
    }
    if (name === 'category') {
      setCat(value);
    }
    setListing(newListingCopy);
  };

  const checkUpload = () => {
    fetch('/v0/listings?memberID=fd4e8e32-bef3-41c0-b111-61f695ea3912', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newListing),
    });
  };

  return (
    <div>
      <AppBar sx={{position: 'fixed'}}>
        <Toolbar>
          <Typography variant='h6'>Create Listing</Typography>
          <IconButton sx={{marginLeft: 'auto'}}
            title='createCloseButton'
            onClick={()=>history.push('/')}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{pl: '12%', my: '50%'}}>
        <TextField
          id='outlined-search'
          label='Name of Listing'
          name='title'
          title='title'
          onChange={handleInputChange}
          required
          sx={{my: '2%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          label='Short description'
          name='content'
          title='content'
          onChange={handleInputChange}
          required
          sx={{my: '3%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          label='Price'
          name='price'
          title='price'
          onChange={handleInputChange}
          required
          sx={{my: '3%', width: '300px'}}
        />
        <TextareaAutosize
          minRows={10}
          placeholder='Type your description here...'
          name='summary'
          title='summary'
          onChange={handleInputChange}
          style={{width: '295px', borderColor: 'lightgrey',
            borderRadius: '1%', marginTop: '15px'}}
        />
        <TextareaAutosize
          minRows={10}
          placeholder='Images, URLS separated by newline'
          name='images'
          title='images'
          onChange={handleInputChange}
          style={{width: '295px', borderColor: 'lightgrey',
            borderRadius: '1%', marginTop: '20px'}}
        />
        <InputLabel htmlFor="grouped-native-select"
          style={{}}>Category</InputLabel>
        <Select
          name='category'
          title='category'
          data-testid='categoryX'
          onChange={handleInputChange}
          sx={{my: '3%', width: '300px'}}
        >
          <MenuItem aria-label="None" value="" />
          <MenuItem value='Cars'>Cars</MenuItem>
          <MenuItem value='Motorcycles'>Motorcycles</MenuItem>
          <MenuItem value='RVs'>RVs</MenuItem>
          <MenuItem value='Boats'>Boats</MenuItem>
          <MenuItem value='Clothing'>Clothing</MenuItem>
          <MenuItem value='Accessories'>Accessories</MenuItem>
          <MenuItem value='Shoes'>Shoes</MenuItem>
          <MenuItem value='Computers'>Computers</MenuItem>
          <MenuItem value='Cellphones'>Cellphones</MenuItem>
          <MenuItem value='TVs'>TVs</MenuItem>
          <MenuItem value='Sports Equipment'>Sports Eq.</MenuItem>
          <MenuItem value='Camping'>Camping</MenuItem>
        </Select>
        {(currCat === 'Cars' ||
              currCat === 'Motorcycles' ||
              currCat === 'RVs' ||
              currCat ==='Boats') &&
        <div>
          <InputLabel htmlFor="grouped-native-select"
            style={{}}>Filter</InputLabel>
          <Select native defaultValue="category"
            id="grouped-native-select"
            name='filter'
            onChange={handleInputChange}
            sx={{my: '3%', width: '300px'}}
          >
            <option aria-label="None" value="" />
            <option value={'White'}>White</option>
            <option value={'Grey'}>Grey</option>
            <option value={'Black'}>Black</option>
            <option value={'Red'}>Red</option>
            <option value={'Blue'}>Blue</option>
          </Select>
        </div>
        }
        {(currCat === 'Clothing' ||
          currCat === 'Accessories' ||
          currCat === 'Shoes') &&
        <div>
          <InputLabel htmlFor="grouped-native-select"
            style={{}}>Filter</InputLabel>
          <Select native defaultValue="category"
            id="grouped-native-select"
            name='filter'
            onChange={handleInputChange}
            sx={{my: '3%', width: '300px'}}
          >
            <option aria-label="None" value="" />
            <option value={'Mens'}>Men's</option>
            <option value={'Womens'}>Women's</option>
          </Select>
        </div>
        }
        {(currCat === 'Computers' ||
          currCat === 'Cellphones' ||
          currCat === 'TVs') &&
        <div>
          <InputLabel htmlFor="grouped-native-select"
            style={{}}>Filter</InputLabel>
          <Select native defaultValue="category"
            id="grouped-native-select"
            name='filter'
            onChange={handleInputChange}
            sx={{my: '3%', width: '300px'}}
          >
            <option aria-label="None" value="" />
            <option value={'Sony'}>Sony</option>
            <option value={'Samsung'}>Samsung</option>
            <option value={'Apple'}>Apple</option>
          </Select>
        </div>
        }
        {(currCat === 'Sports Equipment' ||
          currCat ==='Camping') &&
        <div>
          <InputLabel htmlFor="grouped-native-select"
            style={{}}>Filter</InputLabel>
          <Select native defaultValue="category"
            id="grouped-native-select"
            name='filter'
            onChange={handleInputChange}
            sx={{my: '3%', width: '300px'}}
          >
            <option aria-label="None" value="" />
            <option value={'New'}>New</option>
            <option value={'Used'}>Used</option>
          </Select>
        </div>
        }
        <Button
          style={{backgroundColor: 'lightblue'}}
          onClick={() => {
            checkUpload();
          }}>
          Upload!
        </Button>
      </Box>
    </div>
  );
}

export default CreateListing;
