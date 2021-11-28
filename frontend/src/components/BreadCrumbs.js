import React, {useContext} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CategoryContext from './CategoryContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

/**
 * @return {object}
 */
export default function CustomSeparator({setSearch}) {
  const {currCat, setCategory} = useContext(CategoryContext);
  const {currSub, setSub} = useContext(CategoryContext);
  return (
    <Stack spacing={1}>
      <Breadcrumbs separator="›">
        {currCat !== undefined ?
          <Button color="inherit" display='none'
            onClick={()=>{
              setCategory(undefined);
              setSub(undefined);
              setSearch('');
            }}
          >
        MARKETPLACE
          </Button> :
          <Button style={{visibility: 'hidden'}}>MARKETPLACe</Button>}
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
  );
}
