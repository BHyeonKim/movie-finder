import { UIEvent, useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import MovieItem from '../MovieItem/MovieItem';
import { keywordState, moviesState } from '../../state/moviesState';

import classes from './MovieList.module.scss';
import { getMoviesFromApi } from '../../services/movie';
import { MovieItemDefinition } from '../../types/movie.d';

const MovieList = () => {
  const [movies, setMovies] = useRecoilState(moviesState);
  const keyword = useRecoilValue(keywordState);
  const [page, setPage] = useState(2);

  const onScrollHandler = useCallback(
    async (e: UIEvent<HTMLElement>) => {
      const scrollPosition = e.currentTarget.scrollTop + e.currentTarget.clientHeight;
      // 미리 로딩되게
      if (scrollPosition >= e.currentTarget.scrollHeight - e.currentTarget.clientHeight) {
        let nextPageMovies: MovieItemDefinition[];

        try {
          nextPageMovies = await getMoviesFromApi(keyword, page);
        } catch (error) {
          console.log(error);
        }

        setMovies((prevMovies) => [...prevMovies, ...nextPageMovies]);
        setPage((prevPage) => prevPage + 1);
      }
    },
    [setMovies, setPage, page, keyword]
  );

  return (
    <ul className={classes.movielist} onScroll={onScrollHandler}>
      {movies.map((movie, index) => (
        <MovieItem
          title={movie.title}
          year={movie.year}
          type={movie.type}
          poster={movie.poster}
          index={index}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
};

export default MovieList;
