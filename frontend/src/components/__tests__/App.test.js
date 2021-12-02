import {render, act} from '@testing-library/react';
import '@testing-library/jest-dom';

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
})
