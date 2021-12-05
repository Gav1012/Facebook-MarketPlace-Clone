import React, {useContext} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CategoryContext from './CategoryContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

/**
 * @return {object}
 */
export default function Crumbs() {
  // grabs category state
  const {currCat, setCategory} = useContext(CategoryContext);
  // grabs dimensions state
  const {dimensions} = useContext(CategoryContext);
  // grabs sub category state
  const {currSub, setSub} = useContext(CategoryContext);
  // grabs the search state
  const {setSearch} = useContext(CategoryContext);
  // grabs the filter state
  const {setFilter} = useContext(CategoryContext);
  // renders the breadcrumbs
  // breadcrumb usage based on MUI example
  // https://codesandbox.io/s/euiq0?file=/demo.js
  return (
    <div>
      <Stack spacing={1}>
        <Breadcrumbs separator="›">
          {currCat !== undefined || dimensions.width > 599 ?
            <Button color="inherit" display='none'
              onClick={()=>{
                setCategory(undefined);
                setSub(undefined);
                setFilter(undefined);
                setSearch('');
              }}
            >
              MARKETPLACE
            </Button> : ''}
          {currCat !== undefined? <Button
            underline="hover"
            key="2"
            color="inherit"
            onClick={()=>{
              setSub(undefined);
              setSearch('');
            }}
          >
            {currCat}
          </Button> : ''}
          {currSub !== undefined? <Button
            underline="hover"
            key="2"
            color="inherit"
          >
            {currSub}
          </Button> : ''}
        </Breadcrumbs>
      </Stack>
    </div>
  );
}
