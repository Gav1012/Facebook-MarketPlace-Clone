import React, {useState} from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import App from '../App';
import ListGrid from '../ListGrid';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import CategoryContext from '../CategoryContext'
import ListingContext from '../ListingContext'

const listingv = '/v0/listings/Vehicles'
const listing = '/v0/listings'

const server = setupServer(
  rest.get(listingv, (req, res, ctx) => {
    const subs = req.url.searchParams.getAll('sub')
    const fils = req.url.searchParams.getAll('fil')
        return res(ctx.json([{id: '91bc30cf-186e-4de8-a4c1-37a1449059c7',categoryid: '006915ba-51c1-4bb5-bcfe-5f45e59a5c3a',memberid: 'ff761662-3505-4fcf-b44d-e7307bb586c6',filtertype: 'Womens',listings: {price: '$582',title: 'gold necklace',images: [{link: 'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/884154_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1'}],content: 'it is made out of gold',comments: [],createDate: 'November 23, 2021'}}]))
  }),
  rest.get(listing, (req, res, ctx) => {
    const subs = req.url.searchParams.getAll('sub')
    const fils = req.url.searchParams.getAll('fil')
        return res(ctx.json([{id: '91bc30cf-186e-4de8-a4c1-37a1449059c7',categoryid: '006915ba-51c1-4bb5-bcfe-5f45e59a5c3a',memberid: 'ff761662-3505-4fcf-b44d-e7307bb586c6',filtertype: 'Womens',listings: {price: '$582',title: 'gold necklace',images: [{link: 'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/884154_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1'}],content: 'it is made out of gold',comments: [],createDate: 'November 23, 2021'}}]))
  })
)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const listings = [{id: '91bc30cf-186e-4de8-a4c1-37a1449059c7',categoryid: '006915ba-51c1-4bb5-bcfe-5f45e59a5c3a',memberid: 'ff761662-3505-4fcf-b44d-e7307bb586c6',filtertype: 'Womens',listings: {price: '$582',title: 'gold necklace',images: [{link: 'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/884154_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1'}],content: 'it is made out of gold',comments: [],createDate: 'November 23, 2021'}}];
const setListings = jest.fn();
const currCat = undefined;
const currSub = undefined;
const search = ' ';
const dimensions = {width: 500};


test('listgrid render', async () => {
  render(
    <CategoryContext.Provider value={{currCat, dimensions, currSub, dimensions, search}}>
      <ListGrid setListings={setListings} listings={listings} />
    </CategoryContext.Provider>
  );
  await waitFor(() => {
      expect(screen.getByText('gold necklace'));
      fireEvent.click(screen.getByText('gold necklace'));
    })
  await new Promise((r) => setTimeout(r, 2000));
});
      