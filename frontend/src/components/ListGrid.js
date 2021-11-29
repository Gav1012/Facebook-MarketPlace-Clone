import React, {useContext} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import CategoryContext from './CategoryContext';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {alpha} from '@material-ui/core/styles/colorManipulator';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

// grabs all the listings and specific ones depending on other inputs
const fetchListings = (setListings, currCat, currSub, search) => {
  console.log('inside Fetch Listings');
  console.log(currCat);
  // original string to grab all listings
  let toBeFetched = '/v0/listings';
  // if a category has been clicked, only that category is viewed

  if (currCat && currSub === undefined) {
    toBeFetched = '/v0/listings/' + currCat;
  }

  if (currCat && currSub) {
    toBeFetched = '/v0/listings/' + currCat + '?sub=' + currSub;
  }
  // if search bar is used, includes it in search process
  if (search.length > 0) {
    toBeFetched += '?search=' + search;
  }
  // fetches the listings based on above modifications
  fetch(toBeFetched, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
        console.log('here we go');
      }
      return response.json();
    })
    .then((json) => {
      setListings(json);
    });
};

/**
 * @return {object}
 */
function ListGrid() {
  const [listings, setListings] = React.useState([]);
  const {currCat} = useContext(CategoryContext);
  const {search} = useContext(CategoryContext);
  const {currSub} = useContext(CategoryContext);
  const [dialogPopup, setDialog] = React.useState(false);
  const [popupData, setPopupData] = React.useState(false);
  const [imageNo, setImage] = React.useState(0);
  const [testState, setTestState] = React.useState(0);
  const [rowState, setRowState] = React.useState([]);

  // fetches specific listing when clicking on a listing
  const fetchItem = (popupId) => {
    // const toBeFetched = '/v0/listings';
    const toBeFetched = '/v0/listings?id=' + popupId;
    fetch(toBeFetched, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setPopupData(json);
      });
  };

  const shiftImageLeft = (length) => {
    if (imageNo === 0) {
      setImage(length - 1);
    } else {
      setImage(imageNo - 1);
    }
  };

  const shiftImageRight = (length) => {
    if (imageNo === length - 1) {
      setImage(0);
    } else {
      setImage(imageNo + 1);
    }
  };

  let rows = [];
  const imageBar = (length) => {
    rows = [];
    for (let i = 0; i < length; i++) {
      rows.push(<Button key={i}
        onClick={() => setImage(i)}
        style={{minWidth: '10px', width: '35px',
          backgroundColor: 'black', marginRight: '5px',
          borderRadius: '50%', opacity: '0.5', color: 'white'}}>
        {i+1}
      </Button>);
    }
    setRowState(rows);
    return rows;
  };
  // grabs all the listings from the database
  // and changes depending on categories and search bar
  React.useEffect(() => {
    fetchListings(setListings, currCat, currSub, search);
  }, [currCat, currSub, search]);

  return (
    <Grid container spacing={3}>
      <Dialog fullScreen open={dialogPopup}>
        {popupData &&
          <Box sx={{display: 'grid'}}>
            <img src={popupData[0].listings.images[imageNo].link}
              style={{width: '100%'}}></img>
            {popupData[0].listings.images.length > 1 &&
            <div style={{textAlign: 'center'}} sx={{m: 0.5}}>
              <Button onClick={() => shiftImageLeft(
                popupData[0].listings.images.length)}
              style={{minWidth: '7px', width: '35px',
                backgroundColor: 'black', marginRight: '5px',
                borderRadius: '50%', opacity: '0.5', color: 'white'}}>
              ←</Button>
              {rowState}
              <Button onClick={() => shiftImageRight(
                popupData[0].listings.images.length)}
              style={{minWidth: '7px', width: '35px',
                backgroundColor: 'black',
                borderRadius: '50%', opacity: '0.5', color: 'white'}}>
              →</Button>
            </div>
            }
            <div style={{height: '50px', fontSize: '25pt'}}
            >{popupData[0].listings.title}</div>
            <div style={{height: '30px', fontSize: '15pt'}}
            >{popupData[0].listings.price}</div>
            <div style={{height: '50px', fontSize: '15pt'}}
            >{popupData[0].listings.content}</div>
          </Box>
        }
        <IconButton sx={{marginLeft: 'auto'}} onClick={
          ()=> {
            setDialog(false); setImage(0);
          }}
        style={{right: '0', top: '0', position: 'fixed', color: 'black',
          backgroundColor: alpha('#000', 0.5)}}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
      <Grid container item spacing={2}>
        {listings.map((listing) => (
          <Grid item sx={{ml: 1}} key={listing.id}>
            <CardActionArea key={listing.id} onClick={
              () => {
                fetchItem(listing.id);
                setDialog(true);
                setTestState(testState + 1);
                imageBar(listing.listings.images.length);
              }
            }>
              <Card sx={{width: 180}}>
                <CardMedia
                  component='img'
                  height='140'
                  image={listing.listings.images[0].link}
                  alt={listing.listings.title}
                />
                <CardContent>
                  <Typography variant='h5'>
                    {listing.listings.price}
                  </Typography>
                  <Typography gutterBottom variant='h6'>
                    {listing.listings.title}
                  </Typography>
                  <Typography variant='body2'>
                    {listing.listings.content}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default ListGrid;
