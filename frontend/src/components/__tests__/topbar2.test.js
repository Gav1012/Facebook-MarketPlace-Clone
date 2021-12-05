import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import CategoryContext from '../CategoryContext';
import TopBar from '../TopBar';

const visible = true;
const setVisible = jest.fn();

test('Log out button renders if user is logged in', async () => {
  render(
    <CategoryContext.Provider value={{visible, setVisible}}>
      <TopBar />
    </CategoryContext.Provider>,
  );
  await waitFor(() => {
    screen.getByText('Log out');
  });
  fireEvent.click(screen.getByText('Log out'));
});
