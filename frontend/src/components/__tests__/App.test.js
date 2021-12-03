import {render, act, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';

import App from '../App';

function setWidth(width) {
  global.innerWidth = width;
  act(() => {
    global.dispatchEvent(new Event('resize'));
  });
}
/**
 */
test('App Renders in Desktop form', async () => {
  render(<App />);
});

test('App renders in Mobile form', async () => {
  render(<App />);
  setWidth(550);
  await waitFor(() => {
    expect(screen.getByTitle('search bar'));
    const searchBar = screen.getByTitle('search bar').querySelector('input');
    fireEvent.click(screen.getByTitle('search bar'));
    fireEvent.change(searchBar, {
      target: {
        value: 'real'
      },
    });
    expect(screen.getByTitle('search icon'));
    const searchIcon = screen.getByTitle('search icon');
    fireEvent.click(searchIcon);
    // fireEvent.click(screen.getByRole("button", { name: "close" }));
  })
})
