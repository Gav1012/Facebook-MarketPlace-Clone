import React, {useState} from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Category from '../Category';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import CategoryContext from '../CategoryContext'

const category = '/v0/listings/category'

const server = setupServer(
  rest.get(category, (req, res, ctx) => {
    const subs = req.url.searchParams.getAll('sub')
        return res(ctx.json([{names: 'Cars'}]))
  }),
)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const currCat = undefined;
const dimensions = {width: 700};
const subList = [{names: 'Cars'}];
const catList = [{names: 'Vehicles'}];
const setSub = jest.fn();
const setSearch = jest.fn();
const setCatList = jest.fn();
const setSubList = jest.fn();


test('category render', async () => {
  render(
  
    <CategoryContext.Provider value={{currCat, dimensions, subList, setSub, setSearch, setCatList, setSubList, catList}}>
  <Category/>
  
  </CategoryContext.Provider>
  );
  await new Promise((r) => setTimeout(r, 2000));
});