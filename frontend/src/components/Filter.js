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
    console.log(subList);
    console.log(filList);
    console.log(currFilter);
    console.log(open);
    console.log(setFilter);
    console.log(setSearch);
    console.log(handleChange);

    const handleClickOpen = () => {
        if (dimensions.width < 600) {
          setOpen(true);
        }
      };
      const handleClose = () => {
        setOpen(false);
      };
      console.log(handleClose);
      console.log(handleClickOpen);

    useEffect(() => {
        fetchFilter(setFilList, currCat);
      }, [currCat]);


    return (
        <div>
          {currCat? <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
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
                  }} />
              ))}
            <FormControlLabel value="male"
                control={<Radio />} label="Male" />
            <FormControlLabel value="other"
                control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
            </AccordionDetails>
          </Accordion> : ''}
        </div>
      );
    }
