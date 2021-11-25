import React from 'react';
import TopBar from './TopBar';
import Category from './Category';
import ListGrid from './ListGrid';
// import Dummy from './Dummy';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <div>
      <TopBar />
      <Category />
      <ListGrid />
    </div>
  );
}

export default App;
