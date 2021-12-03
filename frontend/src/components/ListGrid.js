import React, {useContext} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import CategoryContext from './CategoryContext';
import Button from '@mui/material/Button';
import ListViewer from './ListViewer';
import ListingContext from './ListingContext';

// grabs all the listings and specific ones depending on other inputs
const fetchListings = (setListings, currCat, currSub, search) => {
  // original string to grab all listings
  let toBeFetched = '/v0/listings';
  // if a category has been clicked, only that category is viewed
  if (currCat && !currSub) {
    toBeFetched = '/v0/listings/' + currCat;
  }
  if (currCat && currSub) {
    toBeFetched = '/v0/listings/' + currCat + '?sub=' + currSub;
  }
  // if search bar is used, includes it in search process
  if (search) {
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
    }
    return response.json();
  })
  .then((json) => {
    setListings(json);
  })
  .catch(() => {
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
  const [popupData, setPopupData] = React.useState(false);
  const [imageNo, setImage] = React.useState(0);
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
      // console.log('popupdata');
      // console.log(popupData);
    })
    .catch(() => {
    });
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
      {popupData ?
      <ListingContext.Provider value = {{setPopupData, popupData, setImage,
        imageNo, setRowState, rowState}}>
        <ListViewer/>
      </ListingContext.Provider> : null}
      <Grid container item spacing={2}>
        {listings.map((listing) => (
          <Grid item sx={{ml: 1}} key={listing.id} aria-label={listing.title}>
            <CardActionArea id={listing.title} key={listing.id} onClick={
              () => {
                fetchItem(listing.id);
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
