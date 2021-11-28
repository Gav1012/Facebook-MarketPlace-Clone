import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CategoryContext from './CategoryContext';
import TopBar from './TopBar';
import Category from './Category';
import ListGrid from './ListGrid';
import BreadCrumbs from './BreadCrumbs';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  // sets state for category being viewed
  const [currCat, setCategory] = useState(undefined);
  const [currSub, setSub] = useState(undefined);
  // sets state for when search bar is used
  const [search, setSearch] = useState('');

  const winDims = () => ({
    width: window.innerWidth,
  });
  // deals with conditional render
  const [dimensions, setDimensions] = useState(winDims);
  useEffect(() => {
    const handleResize = () => {
      setDimensions(winDims);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <CategoryContext.Provider value={
            {currCat, setCategory, currSub, setSub,
              search, setSearch, dimensions}}>
            <TopBar />
            <BreadCrumbs setSearch={setSearch}/>
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
