import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import CategoryContext from '../CategoryContext';
import {createMemoryHistory} from 'history';
import CreateListing from '../CreateListing';

const authenticate = '/v0/authenticate';
const setVisible = jest.fn();

const server = setupServer(
  rest.post(authenticate, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({email: 'dcharris@ucsc.edu', accessToken: '12345'}));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('login screen appears and login', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <CategoryContext.Provider value={{setVisible}}>
        <CreateListing />
      </CategoryContext.Provider>
    </Router>,
  );
  await waitFor(() => {
    fireEvent.click(screen.getByTitle('createCloseButton'));
  });
});
