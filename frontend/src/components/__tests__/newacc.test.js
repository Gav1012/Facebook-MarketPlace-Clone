import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Router} from 'react-router-dom';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import NewAccount from '../NewAccount';
import {createMemoryHistory} from 'history';

test('New account page renders', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <NewAccount />
    </Router>,
  );
  await waitFor(() => {
    screen.getByText('New Account');
  });
});

test('New account can click close button', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <NewAccount />
    </Router>,
  );
  await waitFor(() => {
    screen.getByText('New Account');
  });
  fireEvent.click(screen.getByLabelText('close'));
  await new Promise((r) => setTimeout(r, 1000));
});
