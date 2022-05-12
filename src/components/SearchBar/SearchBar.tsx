import { FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getMoviesFromApi } from '../../services/movie';
import { keywordState, moviesState } from '../../state/moviesState';

import classes from './SearchBar.module.scss';

const SearchBar = () => {
  const [text, setText] = useState('');
  const setMovies = useSetRecoilState(moviesState);
  const setKeyword = useSetRecoilState(keywordState);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setMovies([]);

    if (text.trim().length === 0) return;

    setMovies(await getMoviesFromApi(text, 1));
    setKeyword(text);

    setText('');
  };

  const inputTextHandler = (e: FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input type='text' onChange={inputTextHandler} className={classes.input} value={text} />
    </form>
  );
};
export default SearchBar;
