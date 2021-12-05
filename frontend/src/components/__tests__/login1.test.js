import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Login from '../Login';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import CategoryContext from '../CategoryContext';
import {createMemoryHistory} from 'history';

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
        <Login />
      </CategoryContext.Provider>
    </Router>,
  );
  await waitFor(() => screen.getByText('Login Screen'));
  const email = screen.getByTitle('email').querySelector('input');
  const password = screen.getByTitle('password').querySelector('input');
  fireEvent.click(screen.getByTitle('email'));
  fireEvent.change(email, {
    target: {
      value: 'dcharris@ucsc.edu',
    },
  });
  fireEvent.click(screen.getByTitle('password'));
  fireEvent.change(password, {
    target: {
      value: 'cse183',
    },
  });
  fireEvent.click(screen.getByText('Login'));
  await new Promise((r) => setTimeout(r, 1000));
  expect(history.length).toBe(2);
});
