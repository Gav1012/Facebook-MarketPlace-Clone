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
        return res(ctx.json([{id: 'da01bf73-a3f1-42ae-8203-f4835585671b',categoryid: '700e982d-15fb-4f2e-a9c0-6629d16730fd',memberid: 'fd4e8e32-bef3-41c0-b111-61f695ea3912',filtertype: 'Grey',listings: {price: '$1,000',title: 'really cool car',images: [{"link":"https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg"}, {"link": "https://render.fineartamerica.com/images/rendered/default/flat/puzzle/images/artworkimages/medium/1/jalopy-skip-hunt.jpg?&targetx=-77&targety=0&imagewidth=1154&imageheight=750&modelwidth=1000&modelheight=750&backgroundcolor=716626&orientation=0&producttype=puzzle-18-24&brightness=253&v=6"}, {"link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-rv4Zn6HB7r37LXAmAgDhGjmvqto9Om_DA&usqp=CAU"}],content: `it's really cool`, createDate: 'November 23, 2021'}}]))
  }),
  rest.get(listing, (req, res, ctx) => {
    const subs = req.url.searchParams.getAll('sub')
    const fils = req.url.searchParams.getAll('fil')
        return res(ctx.json([{id: 'da01bf73-a3f1-42ae-8203-f4835585671b',categoryid: '700e982d-15fb-4f2e-a9c0-6629d16730fd',memberid: 'fd4e8e32-bef3-41c0-b111-61f695ea3912',filtertype: 'Grey',listings: {price: '$1,000',title: 'really cool car',images: [{"link":"https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg"}, {"link": "https://render.fineartamerica.com/images/rendered/default/flat/puzzle/images/artworkimages/medium/1/jalopy-skip-hunt.jpg?&targetx=-77&targety=0&imagewidth=1154&imageheight=750&modelwidth=1000&modelheight=750&backgroundcolor=716626&orientation=0&producttype=puzzle-18-24&brightness=253&v=6"}, {"link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-rv4Zn6HB7r37LXAmAgDhGjmvqto9Om_DA&usqp=CAU"}],content: `it's really cool`, createDate: 'November 23, 2021'}}]))
  })
)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

    const listings = [{id: 'da01bf73-a3f1-42ae-8203-f4835585671b',categoryid: '700e982d-15fb-4f2e-a9c0-6629d16730fd',memberid: 'fd4e8e32-bef3-41c0-b111-61f695ea3912',filtertype: 'Grey',listings: {price: '$1,000',title: 'really cool car',images: [{"link":"https://upload.wikimedia.org/wikipedia/commons/b/b1/Beater_Nissan.jpg"}, {"link": "https://render.fineartamerica.com/images/rendered/default/flat/puzzle/images/artworkimages/medium/1/jalopy-skip-hunt.jpg?&targetx=-77&targety=0&imagewidth=1154&imageheight=750&modelwidth=1000&modelheight=750&backgroundcolor=716626&orientation=0&producttype=puzzle-18-24&brightness=253&v=6"}, {"link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-rv4Zn6HB7r37LXAmAgDhGjmvqto9Om_DA&usqp=CAU"}],content: `it's really cool`, createDate: 'November 23, 2021'}}];
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
            expect(screen.getByText('really cool car'));
            fireEvent.click(screen.getByText('really cool car'));
          })
        await waitFor(() => {
            expect(screen.getByText('1'));
            fireEvent.click(screen.getByText('1'));
          })
          
        await new Promise((r) => setTimeout(r, 2000));

      
      });
      