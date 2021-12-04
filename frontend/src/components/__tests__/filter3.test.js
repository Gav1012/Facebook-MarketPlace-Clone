import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '../Filter';
import CategoryContext from '../CategoryContext';

const currCat = undefined;
const dimensions = {width: 500};
const subList = [{names: 'Cars'}];
const catList = [{names: 'Vehicles'}];
const setSub = jest.fn();
const setSearch = jest.fn();
const setCatList = jest.fn();
const setSubList = jest.fn();
const setFilter = jest.fn();
const setFilList = jest.fn();
const filList = [{names: 'Vehicle Color', attributes: {color1: 'White'}}];

test('filter render', async () => {
  render(
    <CategoryContext.Provider value={{currCat, dimensions, subList,
      setSub, setSearch, setCatList, setSubList, catList, filList,
      setFilList, setFilter,
    }}>
      <Filter />
    </CategoryContext.Provider>,
  );
  await new Promise((r) => setTimeout(r, 2000));
});
