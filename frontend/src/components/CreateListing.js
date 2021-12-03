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
// import {useContext} from 'react';
// import CategoryContext from './CategoryContext';

/**
 *
 * @return {x}
 */
function CreateListing() {
  const history = useHistory();
  const [newListing, setListing] = useState({'listing': {}});
  // let headCats = undefined;
  // let subCats = [];
  // const [catList, setCatList] = useState([]);
  // const [subList, setSubList] = useState([]);
  // // console.log(catList);
  // // console.log(subList);
  // // console.log(setCatList);
  // // console.log(setSubList);
  // const {catList, setCatList} = useContext(CategoryContext);
  // grabs context for subcat list
  // const {subList, setSubList} = useContext(CategoryContext);
  // const [cList, setcList] = useState([]);
  // const [sList, setsList] = useState({});
  // const [loading, setLoading] = useState(false);
  // const test = [1, 2, 3];

  // const fetchCategory = async (setcList) => {
  //   // fetches the listings based on above modifications
  //   fetch('/v0/listings/category', {
  //     method: 'get',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw response;
  //       }
  //       return response.json();
  //     })
  //     .then(async (json) => {
  //       await setcList(json);
  //       console.log('cat');
  //       console.log(cList);
  //       // // console.log(json);
  //       // // console.log(cList);
  //     });
  // };

  // const fetchSub = async (setsList) => {
  //   // setsList([]);
  //   // console.log('clist');
  //   // console.log(cList);
  //   for (let i = 0; i < cList.length; i++) {
  //     // fetches the listings based on above modifications
  //     fetch('/v0/listings/category?sub=' + cList[i]['names'], {
  //       method: 'get',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw response;
  //         }
  //         return response.json();
  //       })
  //       .then(async (json) => {
  //         const copy = sList;
  //         copy[cList[i]['names']] = json;
  //         // copy.push(json);
  //         await setsList(copy);
  //         // console.log('slist');
  //         // console.log(sList);
  //         if (i === cList.length - 1) {
  //           await setLoading(true);
  //           // console.log('loading');
  //           // console.log(loading);
  //         }
  //       });
  //   }
  // };

  // React.useEffect(() => {
  //   fetchCategory(setcList);
  // }, [setcList]);
  // React.useEffect(() => {
  //   fetchSub(setsList);
  // }, [cList, setsList]);

  // // console.log(setCatList);
  // // console.log(setSubList);
  // // console.log('0-211239');
  // // console.log(catList);
  // // console.log(subList);

  // const fetchCategory = (setCatList) => {
  //   // fetches the listings based on above modifications

  //   fetch('/v0/listings/category', {
  //     method: 'get',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw response;
  //       }
  //       return response.json();
  //     })
  //     .then((json) => {
  //       // setCatList(json);
  //       headCats = json;
  //       // console.log(headCats);
  //       // console.log(json);
  //     });
  // };
  // // const fetchSub = (setSubList, currCat) => {
  //   if (currCat) {
  //     // fetches the listings based on above modifications
  //     fetch('/v0/listings/category?sub=' + currCat, {
  //       method: 'get',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw response;
  //         }
  //         return response.json();
  //       })
  //       .then((json) => {
  //         setSubList(json);
  //       });
  //   }
  // };

  // fetchCategory();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    // console.log(value);
    // console.log(name);
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
    setListing(newListingCopy);
    // console.log(newListingCopy);
    // grabs from the user state
    // const u = user;
    // u[name] is the actual input
    // u[name] = value;
    // setUser(u);
  };

  // let rows = [];
  // const subSelect = (catName) => {
  //   rows = [];
  //   // console.log('subslect');
  //   // console.log(sList);
  //   // console.log(catName);
  //   const cat = sList[catName];
  //   console.log('susslect cat');
  //   console.log(cat);
  //   for (let i = 0; i < cat.length; i++) {
  //     console.log('WHY???');
  //     console.log(cat[i]);
  //     rows.push(<option>{cat[i]}</option>);
  //   }
  //   return rows;
  // };

  // // const fetchSub = (setSubList, currCat) => {
  //   if (currCat) {
  //     // fetches the listings based on above modifications
  //     fetch('/v0/listings/category?sub=' + currCat, {
  //       method: 'get',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw response;
  //         }
  //         return response.json();
  //       })
  //       .then((json) => {
  //         setSubList(json);
  //       });
  //   }
  // };

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
        {/* <Box sx={{pl: '38%'}}>
          <AccountCircleIcon />
        </Box> */}
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
        <InputLabel htmlFor="grouped-native-select"
          style={{}}>Category</InputLabel>
        {/* <div>x</div> */}
        {/* {// console.log('x')}
          {// console.log(cList)} */}
        {/* {loading && cList.map((test) => {
          return (<div>{'x'}{// console.log(test)}
            {// console.log('HWAT')}</div>);
        })} */}
        <Select native defaultValue="category"
          id="grouped-native-select"
          name='category'
          onChange={handleInputChange}
          style={{color: 'red'}}>
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
          {/* {// console.log('xyz')}
          {// console.log(cList)} */}
          {/* {cList && // console.log(cList)} */}
          {/* {// console.log(cList)}
          {// console.log(sList)} */}
          {/* {loading && // console.log('sListauwgduw' + sList)} */}
          {/* {loading && cList.map((cat) => {
            return (
            <optgroup label={cat['names']}>
              {console.log('LOOK')}
              {console.log(cat['names'])}
              {subSelect(cat['names'])}
              {/* {// console.log(cat)} */}
          {/* <option value={'test'}>test</option> */}
          {/* </optgroup>
            );
          })} */}
          {/* <optgroup label="Vehicles">
            <option value={'Cars'}>Cars</option>
            <option value={'Motorcycles'}>Motorcycles</option>
            <option value={'RVs'}>RVs</option>
            <option value={'Boats'}>Boats</option>
          </optgroup>
          <optgroup label="Apparell">
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </optgroup> */}
        </Select>
        <TextareaAutosize
          minRows={10}
          placeholder='Type your description here...'
          name='summary'
          onChange={handleInputChange}
          style={{width: '295px', borderColor: 'lightgrey',
            borderRadius: '1%', marginTop: '20px'}}
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
          placeholder='Images, URLS separated by newline'
          name='images'
          onChange={handleInputChange}
          style={{width: '295px', borderColor: 'lightgrey',
            borderRadius: '1%', marginTop: '20px'}}
        />
        <TextField
          id='outlined-search'
          label='Filter'
          name='filter'
          onChange={handleInputChange}
          required
          sx={{my: '3%', width: '300px'}}
        />
        <Button
          style={{backgroundColor: 'lightblue'}}
          onClick={() => checkUpload()}>
          Upload!
        </Button>
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // placeholder="filters"
          // value={age}
          label='Type here'
          style={{color: 'black'}}
          sx={{my: '3%', width: '300px'}}
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> */}
        {/* <Button
          variant='contained'
          type='submit'
          sx={{my: '3%', width: '300px'}}>
          Login
        </Button>
        <Button
          variant='contained'
          href='/NewAccount'
          sx={{width: '300px'}}>
          New User
        </Button> */}
      </Box>
    </div>
  );
}

export default CreateListing;
