import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';

const fetchListings = (setListings) => {
  fetch('/v0/listings', {
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

  React.useEffect(() => {
    fetchListings(setListings);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid container item spacing={2}>
        {listings.map((listing) => (
          <Grid item xs={6} key={listing.id}>
            <CardActionArea>
              <Card sx={{width: 200}}>
                <CardMedia
                  component='img'
                  height='140'
                  image="https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg"
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
