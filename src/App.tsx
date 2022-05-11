import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import Tab from './components/Tab/Tab';

import classes from './App.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <SearchBar />
      <MovieList />
      <Tab />
    </div>
  );
};

export default App;
