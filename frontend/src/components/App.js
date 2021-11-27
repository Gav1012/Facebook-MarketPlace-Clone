import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CategoryContext from './CategoryContext';
import TopBar from './TopBar';
import Category from './Category';
import ListGrid from './ListGrid';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  // sets state for category being viewed
  const [currCat, setCategory] = useState(undefined);
  // sets state for when search bar is used
  const [search, setSearch] = useState('');

  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <TopBar />
          <CategoryContext.Provider value={{currCat, setCategory,
            search, setSearch}}>
            <Category setSearch={setSearch}/>
            <ListGrid/>
          </CategoryContext.Provider>
        </Route>
        {/* <Route path='/login'>
          <Login />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
