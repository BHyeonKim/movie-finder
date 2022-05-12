import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import Tab from './components/Tab/Tab';

import classes from './App.module.scss';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <div className={classes.app}>
      <RecoilRoot>
        <SearchBar />
        <MovieList />
        <Tab />
      </RecoilRoot>
    </div>
  );
};

export default App;
