import React, {useState} from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import App from '../App';
import Filter from '../Filter';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import CategoryContext from '../CategoryContext'

const filter = '/v0/listings/category'

const server = setupServer(
  rest.get(filter, (req, res, ctx) => {
    const sub = req.url.searchParams.getAll('sub')
    const fil = req.url.searchParams.getAll('fil')
        return res(ctx.json([{names: 'Vehicle Color', attributes: {color1: 'White'}}]))
  }),
)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const currCat = 'Vehicles';
const dimensions = {width: 700};
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
  
    <CategoryContext.Provider value={{currCat, dimensions, subList, setSub, setSearch, setCatList, setSubList, catList, filList, setFilList, setFilter}}>
  <Filter />
  </CategoryContext.Provider>
  );
  await waitFor(() => screen.getByText('Vehicle Color'));
  fireEvent.click(screen.getByText('Vehicle Color'));
  await waitFor(() => screen.getByText('White'));
  fireEvent.click(screen.getByText('White'));
  await new Promise((r) => setTimeout(r, 2000));
});

test('Handles Server Error Filter', async () => {
  server.use(
    rest.get(filter, (req, res, ctx) => {
      return res(ctx.status(404))
    }),
  )
  render(
    <CategoryContext.Provider value={{currCat, dimensions, subList, setSub, setSearch, setCatList, setSubList, catList, filList, setFilList, setFilter}}>
  <Filter/>
  </CategoryContext.Provider>
  );
  await new Promise((r) => setTimeout(r, 2000));
});
