import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import CategoryContext from '../CategoryContext';
import TopBar from '../TopBar';

const visible = false;
const setVisible = jest.fn();

test('topbar render', async () => {
  render(
    <CategoryContext.Provider value={{visible, setVisible}}>
      <TopBar />
    </CategoryContext.Provider>,
  );
  await waitFor(() => {
    screen.getByText('Login');
  });
  fireEvent.click(screen.getByText('Login'));
});
