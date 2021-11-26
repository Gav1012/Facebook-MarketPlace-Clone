import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TopBar from './TopBar';
import Category from './Category';
import ListGrid from './ListGrid';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <TopBar />
          <Category />
          <ListGrid />
        </Route>
        {/* <Route path='/login'>
          <Login />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
