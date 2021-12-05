import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import ListGrid from '../ListGrid';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import CategoryContext from '../CategoryContext';

const listing = '/v0/listings';

const server = setupServer(
  rest.get(listing, (req, res, ctx) => {
    return res(ctx.json([{id: '123', categoryid: '456', memberid: '789', filtertype: 'Grey', listings: {price: '$1,000', title: 'really cool car', images: [{link: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg'}, {link: 'https://render.fineartamerica.com/images/rendered/default/flat/puzzle/images/artworkimages/medium/1/jalopy-skip-hunt.jpg?&targetx=-77&targety=0&imagewidth=1154&imageheight=750&modelwidth=1000&modelheight=750&backgroundcolor=716626&orientation=0&producttype=puzzle-18-24&brightness=253&v=6'}, {link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-rv4Zn6HB7r37LXAmAgDhGjmvqto9Om_DA&usqp=CAU'}], content: `it's really cool`, createDate: 'November 23, 2021'}}]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const listings = [{id: '123', categoryid: '456', memberid: '789', filtertype: 'Grey', listings: {price: '$1,000', title: 'really cool car', images: [{link: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg'}, {link: 'https://render.fineartamerica.com/images/rendered/default/flat/puzzle/images/artworkimages/medium/1/jalopy-skip-hunt.jpg?&targetx=-77&targety=0&imagewidth=1154&imageheight=750&modelwidth=1000&modelheight=750&backgroundcolor=716626&orientation=0&producttype=puzzle-18-24&brightness=253&v=6'}, {link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-rv4Zn6HB7r37LXAmAgDhGjmvqto9Om_DA&usqp=CAU'}], content: `it's really cool`, createDate: 'November 23, 2021'}}];
const setListings = jest.fn();
const currCat = undefined;
const currSub = undefined;
const search = ' ';
const imageNo = 0;
const dimensions = {width: 500};

test('ListGrid, clicking on listing with multiple pics', async () => {
  render(
    <CategoryContext.Provider value={{
      currCat, dimensions, currSub, search, imageNo,
    }}>
      <ListGrid setListings={setListings} listings={listings} />
    </CategoryContext.Provider>,
  );
  await waitFor(() => {
    expect(screen.getByText('really cool car'));
    fireEvent.click(screen.getByText('really cool car'));
  });
  await waitFor(() => {
    expect(screen.getByText('1'));
    fireEvent.click(screen.getByText('1'));
  });
  await waitFor(() => {
    expect(screen.getByTitle('leftButton'));
    fireEvent.click(screen.getByTitle('leftButton'));
  });
  await waitFor(() => {
    expect(screen.getByTitle('leftButton'));
    fireEvent.click(screen.getByTitle('leftButton'));
  });
  await waitFor(() => {
    expect(screen.getByTitle('rightButton'));
    fireEvent.click(screen.getByTitle('rightButton'));
  });
  await waitFor(() => {
    expect(screen.getByTitle('rightButton'));
    fireEvent.click(screen.getByTitle('rightButton'));
  });
  await waitFor(() => {
    expect(screen.getByTitle('rightButton'));
    fireEvent.click(screen.getByTitle('rightButton'));
  });
  await waitFor(() => {
    expect(screen.getByTitle('closeButton'));
    fireEvent.click(screen.getByTitle('closeButton'));
  });
  await new Promise((r) => setTimeout(r, 2000));
});
