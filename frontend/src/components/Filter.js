import React, {useContext, useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CategoryContext from './CategoryContext';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const fetchFilter = (setFilList, currCat) => {
  if (currCat) {
    // fetches the listings based on above modifications
    fetch('/v0/listings/category?sub=' + currCat, {
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
        setFilList(json);
      });
  }
};
/**
 * @return {object}
 */
export default function Filter() {
  const {currCat} = useContext(CategoryContext);
  const {dimensions} = useContext(CategoryContext);
  const {setSearch} = useContext(CategoryContext);
  const {setSub} = useContext(CategoryContext);
  const {currFilter, setFilter} = useContext(CategoryContext);
  const {subList} = useContext(CategoryContext);
  const {filList, setFilList} = useContext(CategoryContext);
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  console.log(filList);
  console.log(currFilter);
  console.log(open);
  console.log(setFilter);
  console.log(handleChange);
  const handleClickOpen = () => {
    if (dimensions.width < 600) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchFilter(setFilList, currCat);
  }, [setFilList, currCat]);
  return (
    <div>
      {currCat && dimensions.width < 600?
        <Button variant="outlined" startIcon={<TuneIcon />}
          label='Filters' onClick={handleClickOpen}>
          Filter
        </Button> : ''};
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <Typography>Filters</Typography>
            <IconButton
              sx={{marginLeft: 'auto'}} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {currCat && dimensions.width < 600? <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style= {{width: '90%'}}
          >
            <Typography>Subcategories for {currCat}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
              >
                {subList.map((sub) => (
                  <FormControlLabel value={sub.names}
                    control={<Radio />} label={sub.names} onClick={()=>{
                      setSub(sub.names);
                      handleClose();
                      setSearch('');
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion> : ''}
      </Dialog>
      {currCat && dimensions.width > 599? <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style= {{width: '90%'}}
        >
          <Typography>Subcategories for {currCat}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {subList.map((sub) => (
                <FormControlLabel value={sub.names}
                  control={<Radio />} label={sub.names} onClick={()=>{
                    setSub(sub.names);
                    setSearch('');
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion> : ''}
    </div>
  );
}
