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
// fetch based on books example provided by Professor Harrison
const fetchListings = (setListings, currCat, currSub, search, currFilter) => {
  // original string to grab all listings
  let toBeFetched = '/v0/listings';
  // if a category has been clicked, only that category is viewed
  if (currCat && !currSub && !currFilter && !search) {
    toBeFetched = '/v0/listings/' + currCat;
  }
  // if only category and sub category is active
  if (currCat && currSub && !currFilter && !search) {
    toBeFetched = '/v0/listings/' + currCat + '?sub=' + currSub;
  }
  // if only category and filter is active
  if (currCat && !currSub && currFilter && !search) {
    toBeFetched = '/v0/listings/' + currCat + '?fil=' + currFilter;
  }
  // if all are active
  if (currCat && currSub && currFilter && !search) {
    toBeFetched =
      '/v0/listings/' + currCat + '?sub=' + currSub + '&fil=' + currFilter;
  }
  // if search bar is used, includes it in search process
  if (search && !currCat && !currSub && !currFilter) {
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
      // makes no listings appear
      setListings([]);
    });
};

/**
 * @return {object}
 */
function ListGrid() {
  // grabs state for listings
  const [listings, setListings] = React.useState([]);
  // grabs state for category
  const {currCat} = useContext(CategoryContext);
  // grabs state for search
  const {search} = useContext(CategoryContext);
  // grabs state for sub category
  const {currSub} = useContext(CategoryContext);
  // grabs state for filter
  const {currFilter} = useContext(CategoryContext);
  // grabs state for clicking on a listing
  const [popupData, setPopupData] = React.useState(false);
  // sets state for displaying a listings images
  const [imageNo, setImage] = React.useState(0);
  // grabs state for listings with multiple pictures
  const [rowState, setRowState] = React.useState([]);

  // fetches specific listing when clicking on a listing
  // fetch based on books example provided by Professor Harrison
  const fetchItem = (popupId) => {
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
      })
      .catch(() => {
      });
  };
  // sets up for images to be clicked for list viewer
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
    fetchListings(setListings, currCat, currSub, search, currFilter);
  }, [currCat, currSub, search, currFilter]);

  // renders all the listings from the database
  // the rendering of the listings is a combination of examples from MUI
  // using Grid and Card components to create listings
  // https://codesandbox.io/s/ilg2z?file=/demo.js
  // https://codesandbox.io/s/rf7vt?file=/demo.js
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
              <Card variant='outlined' sx={{width: 175, height: 275}}>
                <CardMedia
                  component='img'
                  height='140'
                  image={listing.listings.images[0].link}
                  alt={listing.listings.title}
                />
                <CardContent>
                  <Typography variant='h6'>
                    {listing.listings.price}
                  </Typography>
                  <Typography gutterBottom variant='subtitle1'>
                    {listing.listings.title}
                  </Typography>
                  <Typography variant='caption'>
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
