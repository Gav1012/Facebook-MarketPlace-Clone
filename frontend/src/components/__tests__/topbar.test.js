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
import TopBar from '../TopBar';

const dimensions = {width: 500};

test('topbar render', async () => {
  render(
    <CategoryContext.Provider value={{dimensions}}>
      <TopBar  />
    </CategoryContext.Provider>
  );
  await waitFor(() => {
      expect(screen.getByText('Login'));
    })
  fireEvent.click(screen.getByText('Login'));
});
      