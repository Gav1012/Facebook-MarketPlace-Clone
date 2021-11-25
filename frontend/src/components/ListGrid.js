import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';

/**
 * @return {object}
 */
function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <CardActionArea>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://engineering.ucsc.edu/people/dcharris/photo/1"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                TEMP ITEM
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <Grid item xs={6}>
        <CardActionArea>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://engineering.ucsc.edu/people/dcharris/photo/1"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                TEMP ITEM
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </React.Fragment>
  );
}

/**
 * @return {object}
 */
function ListGrid() {
  return (
    <Grid container spacing={3}>
      <Grid container item spacing={2}>
        <FormRow />
        <FormRow />
        <FormRow />
        <FormRow />
        <FormRow />
      </Grid>
    </Grid>
  );
}

export default ListGrid;
