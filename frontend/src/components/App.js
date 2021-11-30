import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CategoryContext from './CategoryContext';
import TopBar from './TopBar';
import Category from './Category';
import Search from './Search';
import ListGrid from './ListGrid';
import Drawer from './Drawer';
import BreadCrumbs from './BreadCrumbs';
import Filter from './Filter';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  // sets state for category being viewed
  const [currCat, setCategory] = useState(undefined);
  const [currSub, setSub] = useState(undefined);
  const [currFilter, setFilter] = useState(undefined);
  const [catList, setCatList] = useState([]);
  const [subList, setSubList] = useState([]);
  const [filList, setFilList] = useState([]);
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
              search, setSearch, dimensions, catList, setCatList,
              subList, setSubList, currFilter, setFilter,
              filList, setFilList}}>
            <TopBar />
            <div style={dimensions.width > 599 ? {margin: 500} : {margin: 0}}>
              {dimensions.width < 600? <BreadCrumbs/> : ''}
              <Category setSearch={setSearch}/>
              {dimensions.width > 599 ? <Drawer /> : ''}
              <div style={{margin: 10}}>
                {dimensions.width < 600? <Search /> : ''}
                {dimensions.width < 600? <Filter /> : ''}
              </div>
              <ListGrid/>
            </div>
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
