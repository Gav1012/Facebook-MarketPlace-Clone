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
import Login from './Login';
import NewAccount from './NewAccount';
import CreateListing from './CreateListing';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  // sets state for current category being viewed
  const [currCat, setCategory] = useState(undefined);
  // sets state for current sub category
  const [currSub, setSub] = useState(undefined);
  // sets state for current filter
  const [currFilter, setFilter] = useState(undefined);
  // holds all the categories from database
  const [catList, setCatList] = useState([]);
  // holds all sub categories from database
  const [subList, setSubList] = useState([]);
  // holds all filters from database
  const [filList, setFilList] = useState([]);
  // sets state for when search bar is used
  const [search, setSearch] = useState('');
  // determines whether login or logout is displayed
  const [visible, setVisible] = useState(false);

  // from the Dimensions Provider function provided by Professor Harrison
  // handles when the window size changes
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
  // renders the entire application
  // BrowserRouter setup inspired by code provided by Professor Harrison
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <CategoryContext.Provider value={
            {currCat, setCategory, currSub, setSub,
              search, setSearch, dimensions, catList, setCatList,
              subList, setSubList, currFilter, setFilter,
              filList, setFilList, visible, setVisible}}>
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
        <Route path='/login'>
          <CategoryContext.Provider value={{visible, setVisible}}>
            <Login />
          </CategoryContext.Provider>
        </Route>
        <Route path='/CreateListing'>
          <CreateListing/>
        </Route>
        <Route path='/newaccount'>
          <NewAccount />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
