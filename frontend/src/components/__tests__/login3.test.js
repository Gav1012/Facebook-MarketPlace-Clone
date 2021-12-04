import React, {useState} from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Login from '../Login';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import CategoryContext from '../CategoryContext'
import {createMemoryHistory} from "history";

const authenticate = '/v0/authenticate';
const setVisible = jest.fn();

const server = setupServer(
  rest.post(authenticate, (req, res, ctx) => {
    return res(
      ctx.status(401))
  }),
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('login screen click on close button', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <CategoryContext.Provider value={{setVisible}}>
        <Login />
      </CategoryContext.Provider>
    </Router>
  );
  await waitFor(() => screen.getByText("Login Screen"));
  fireEvent.click(screen.getByLabelText('close'));
  await new Promise((r) => setTimeout(r, 1000));
})