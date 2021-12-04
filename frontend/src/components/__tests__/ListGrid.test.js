import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import ListGrid from '../ListGrid';
import CategoryContext from '../CategoryContext';

const URL = '/v0/listings';

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(
      ctx.json([{id: '1', categoryID: '2', memberID: '3', filterType: 'Women', listings: {title: 'gold necklace', content: 'it is made out of gold', summary: 'this is a gold necklace from walmart, it has been slightly worn. other than a few scratches here or there it is pretty much brand new.', price: '$582', createDate: 'November 23, 2021', images: [{link: 'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/884154_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1'}]}}]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const currCat = '';
const currSub = '';
const search = '';

test('ListGrid Exists', async () => {
  render(
    <CategoryContext.Provider value={{
      currCat, currSub, search}}>
      <ListGrid />
    </CategoryContext.Provider>,
  );
  await waitFor(() => {
    screen.getByText('gold necklace');
  });
});
