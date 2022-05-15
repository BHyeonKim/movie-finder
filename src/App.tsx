import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import Bookmark from './components/BookmarkList/BookmarkList';
import Tab from './components/Tab/Tab';

import { bookMarkState } from './state/moviesState';

import classes from './App.module.scss';
import { MovieItemDefinition } from './types/movie.d';
import { Suspense, useEffect } from 'react';

const App = () => {
  const setBookmark = useSetRecoilState(bookMarkState);

  // 처음 localstorage에 들어있는 bookmark 불러오기
  useEffect(() => {
    const storedBookmarks: MovieItemDefinition[] = JSON.parse(localStorage.getItem('movies') || '[]');
    if (storedBookmarks.length === 0) {
      return;
    }
    setBookmark([...storedBookmarks]);
  }, [setBookmark]);

  return (
    <div className={classes.app}>
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
    </div>
  );
};

export default App;
