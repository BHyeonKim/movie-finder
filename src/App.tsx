import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import Bookmark from './components/BookmarkList/BookmarkList';
import Tab from './components/Tab/Tab';

import classes from './App.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='/bookmark' element={<Bookmark />} />
            <Route
              path='/'
              element={
                <>
                  <SearchBar />
                  <MovieList />
                </>
              }
            />
            <Route path='*' element={<Navigate replace to='/' />} />
          </Routes>
          <Tab />
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
