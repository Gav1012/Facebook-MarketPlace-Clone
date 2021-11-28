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
  // const [popupId, setPopupId] = React.useState('');
  const [dialogPopup, setDialog] = React.useState(false);
  const [popupData, setPopupData] = React.useState(false);
  // console.log(popupData);

  const fetchItem = (popupId) => {
    console.log('fetching specific item');
    console.log(popupId);
    // const toBeFetched = '/v0/listings';
    const toBeFetched = '/v0/listings?id=' + popupId;
    console.log(toBeFetched);
    fetch(toBeFetched, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log('error');
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setPopupData(json);
        console.log('setting...');
        // console.log(json);
        console.log(json[0].listings);
      });
      console.log('end');
  };

  React.useEffect(() => {
    fetchListings(setListings, currCat, currSub, search);
  }, [currCat, currSub, search]);

  return (
    <div>
      <Grid container spacing={3}>
        <Dialog fullscreen='true' open={dialogPopup}
        style={{zIndex: 9999, height: '100vh', left: '0',
        width: '100%', backgroundColor: 'black', position: 'fixed',
        margin: 0}}>
          {/* <img style={{width: '50vh', height: '100vh',
            position: 'relative'}}
            src={popupData[0].listings.images[0].link}>
          </img> */}
            {/* <img src={popupData[0].listings.images[0].link}>
            </img>
            {popupId}
            {popupData[0].listings.title} */}
            {/* {popupId}
            {popupData && popupData[0].listings.title} */}
            {/* // <Grid style={{height: '100vh'}}container spacing={2}>
            //   <Grid item xs={6}>
            //     <img style={{width: '100%'}}
            //     src={popupData[0].listings.images[0].link}></img>
            //   </Grid>
            //   <Grid item xs={6}>
            //     <div>{popupData[0].listings.title}</div>
            //   </Grid>
            //   <Grid item xs={6}>
            //     <div>{popupId}</div>
            //   </Grid>
            // </Grid> */}
            {popupData &&
            <Box sx={{display: 'grid'}}>
              <img src={popupData[0].listings.images[0].link}
              style={{width: '100%', height: '100%'}}></img>
              <div style={{height: '50px', fontSize: '25pt'}}
              >{popupData[0].listings.title}</div>
              <div style={{height: '30px', fontSize: '15pt'}}
              >{popupData[0].listings.price}</div>
              <div style={{height: '50px', fontSize: '15pt'}}
              >{popupData[0].listings.content}</div>
            </Box>
            }
            {/* {popupData[0].listings.title} */}
            {/* <Card sx={{width: '100vh'}}>
              <CardMedia
                component='img'
                height='140'
                image={popupData[0].listings.images[0].link}
                alt={popupData[0].listings.title}
              />
              <CardContent>
                <Typography variant='h5'>
                  {popupData[0].listings.price}
                </Typography>
                <Typography gutterBottom variant='h6'>
                  {popupData[0].listings.title}
                </Typography>
                <Typography variant='body2'>
                  {popupData[0].listings.content}
                </Typography>
              </CardContent>
            </Card> */}
          <Button onClick={() => setDialog(false)}
          style={{right: '0', top: '0', width: '10px',
          position: 'fixed', zIndex: '99999'}}>
            x
          </Button>
        </Dialog>
        <Grid container item spacing={2}>
          {listings.map((listing) => (
            <Grid item xs={6} key={listing.id}>
              <CardActionArea key={listing.id} onClick={
                () => {
                  setDialog(true);
                  fetchItem(listing.id);
                  }
                }>
                <Card sx={{width: 200}}>
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
    </div>
  );
}

export default ListGrid;
