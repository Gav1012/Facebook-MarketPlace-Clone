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
// import {MenuItem} from '@mui/material';
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

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    console.log(value);
    console.log(name);
    const newListingCopy = newListing;
    if (name === 'title' ||
      name === 'content' ||
      name === 'summary' ||
      name === 'price') {
      newListing['listing'][name] = value;
    } else if (name === 'images') {
      const newVal = value.split('\n');
      console.log(newVal);
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
    console.log(newListing);
    fetch('/v0/listings?memberID=fd4e8e32-bef3-41c0-b111-61f695ea3912', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newListing),
    });
  };

  return (
    <div>
      <AppBar sx={{position: 'fixed'}}>
        <Toolbar>
          <Typography variant='h6'>Login Screen</Typography>
          <IconButton sx={{marginLeft: 'auto'}}
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
          onChange={handleInputChange}
          required
          sx={{my: '2%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          label='Short description'
          name='content'
          onChange={handleInputChange}
          required
          sx={{my: '3%', width: '300px'}}
        />
        <TextField
          id='outlined-search'
          label='Price'
          name='price'
          onChange={handleInputChange}
          required
          sx={{my: '3%', width: '300px'}}
        />
        <TextareaAutosize
          minRows={10}
          placeholder='Type your description here...'
          name='summary'
          onChange={handleInputChange}
          style={{width: '295px', borderColor: 'lightgrey',
            borderRadius: '1%', marginTop: '15px'}}
        />
        <TextareaAutosize
          minRows={10}
          placeholder='Images, URLS separated by newline'
          name='images'
          onChange={handleInputChange}
          style={{width: '295px', borderColor: 'lightgrey',
            borderRadius: '1%', marginTop: '20px'}}
        />
        <InputLabel htmlFor="grouped-native-select"
          style={{}}>Category</InputLabel>
        <Select native defaultValue="category"
          id="grouped-native-select"
          name='category'
          onChange={handleInputChange}
          sx={{my: '3%', width: '300px'}}
        >
          <option aria-label="None" value="" />
          <optgroup label={'Vehicles'}>
            <option value={'Cars'}>Cars</option>
            <option value={'Motorcycles'}>Motorcycles</option>
            <option value={'RVs'}>RVs</option>
            <option value={'Boats'}>Boats</option>
          </optgroup>
          <optgroup label={'Apparel'}>
            <option value={'Clothing'}>Clothing</option>
            <option value={'Accessories'}>Accessories</option>
            <option value={'Shoes'}>Shoes</option>
          </optgroup>
          <optgroup label={'Electronics'}>
            <option value={'Computers'}>Computers</option>
            <option value={'Cellphones'}>Cellphones</option>
            <option value={'TVs'}>TVs</option>
          </optgroup>
          <optgroup label={'Sporting Goods'}>
            <option value={'Sports Equipment'}>Sports Eq.</option>
            <option value={'Camping'}>Camping</option>
          </optgroup>
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
            checkUpload(); console.log(currCat);
          }}>
          Upload!
        </Button>
      </Box>
    </div>
  );
}

export default CreateListing;
