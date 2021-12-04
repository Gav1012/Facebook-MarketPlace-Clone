import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import ListGrid from '../ListGrid';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import CategoryContext from '../CategoryContext';

const listingv = '/v0/listings/Vehicles';

const server = setupServer(
  rest.get(listingv, (req, res, ctx) => {
    return res(ctx.json([{id: '123', categoryid: '456', memberid: '789', filtertype: 'Womens', listings: {price: '$582', title: 'gold necklace', images: [{link: 'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/884154_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1'}], content: 'it is made out of gold', comments: [], createDate: 'November 23, 2021'}}]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const listings = [{id: '123', categoryid: '456', memberid: '789', filtertype: 'Womens', listings: {price: '$582', title: 'gold necklace', images: [{link: 'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/884154_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1'}], content: 'it is made out of gold', comments: [], createDate: 'November 23, 2021'}}];
const setListings = jest.fn();
const currCat = 'Vehicles';
const currFilter = 'Grey';
const currSub = 'Cars';
const search = '';
const dimensions = {width: 500};

test('Listgrid filter and sub', async () => {
  render(
    <CategoryContext.Provider value={{
      currCat, dimensions, currSub, search, currFilter,
    }}>
      <ListGrid setListings={setListings} listings={listings}/>
    </CategoryContext.Provider>,
  );
  await waitFor(() => {
    expect(screen.getByText('gold necklace'));
    fireEvent.click(screen.getByText('gold necklace'));
    expect(screen.getByText('gold necklace'));
    fireEvent.click(screen.getByText('gold necklace'));
  });
  await new Promise((r) => setTimeout(r, 2000));
});
