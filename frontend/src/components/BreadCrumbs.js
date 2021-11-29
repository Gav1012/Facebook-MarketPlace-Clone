import React, {useContext} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CategoryContext from './CategoryContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

/**
 * @return {object}
 */
export default function CustomSeparator() {
  const {currCat, setCategory} = useContext(CategoryContext);
  const {dimensions} = useContext(CategoryContext);
  const {currSub, setSub} = useContext(CategoryContext);
  const {setSearch} = useContext(CategoryContext);
  return (
    <div>
      <Stack spacing={1}>
        <Breadcrumbs separator="›">
          {currCat !== undefined || dimensions.width > 599 ?
            <Button color="inherit" display='none'
              onClick={()=>{
                setCategory(undefined);
                setSub(undefined);
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
