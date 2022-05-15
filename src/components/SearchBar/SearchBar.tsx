import { FormEvent, useCallback, useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';

import MessageBox from '../MessageBox/MessageBox';

import { getMoviesFromApi } from '../../services/movie';

import { keywordState, moviesState } from '../../state/moviesState';

import classes from './SearchBar.module.scss';

const SearchBar = () => {
  const [text, setText] = useState('');
  const [resultState, setResultState] = useState('검색결과가 없습니다.');
  const [movies, setMovies] = useRecoilState(moviesState);
  const setKeyword = useSetRecoilState(keywordState);

  const submitHandler = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setMovies([]);

      if (text.trim().length === 0) return;

      try {
        setMovies(await getMoviesFromApi(text, 1));
      } catch (error) {
        if (error instanceof Error) {
          setResultState(error.message);
          return;
        }
        return;
      }

      setKeyword(text);
      setText('');
      setResultState('');
    },
    [setMovies, setKeyword, text]
  );

  const inputTextHandler = useCallback((e: FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        onChange={inputTextHandler}
        className={classes.input}
        value={text}
        placeholder='What is your favorite movie?'
      />
      {resultState && movies.length === 0 && <MessageBox message={resultState} />}
    </form>
  );
};
export default SearchBar;
