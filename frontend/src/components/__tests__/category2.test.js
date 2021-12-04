import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import Category from '../Category';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import CategoryContext from '../CategoryContext';

const category = '/v0/listings/category';

const server = setupServer(
  rest.get(category, (req, res, ctx) => {
    return res(ctx.json([{names: 'Vehicles'}]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const currCat = undefined;
const dimensions = {width: 500};
const catList = [{names: 'Vehicles'}];
const setSub = jest.fn();
const setSearch = jest.fn();
const setCatList = jest.fn();
const setSubList = jest.fn();
const setCategory = jest.fn();
const setFilter = jest.fn();
const createListing = jest.fn();

test('category render', async () => {
  render(
    <CategoryContext.Provider value={{
      currCat, dimensions, setSub, setSearch, setCatList,
      setSubList, catList, setCategory, setFilter, createListing,
    }}>
      <Category/>
    </CategoryContext.Provider>,
  );
  await waitFor(() => screen.getByText('Sell'));
  fireEvent.click(screen.getByText('Sell'));
  await waitFor(() => screen.getByText('Categories'));
  fireEvent.click(screen.getByText('Categories'));
  await waitFor(() => screen.getByText('Vehicles'));
  fireEvent.click(screen.getByText('Vehicles'));
});

test('Handles Server Error', async () => {
  server.use(
    rest.get(category, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  render(
    <CategoryContext.Provider value={{
      currCat, dimensions, catList, setCatList, setSub,
      setSearch, setSubList, setCategory, setFilter, createListing,
    }}>
      <Category/>
    </CategoryContext.Provider>,
  );
  await new Promise((r) => setTimeout(r, 2000));
});
