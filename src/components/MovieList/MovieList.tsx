import { UIEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import MovieItem from '../MovieItem/MovieItem';
import { bookMarkState, keywordState, moviesState } from '../../state/moviesState';

import classes from './MovieList.module.scss';
import { getMoviesFromApi } from '../../services/movie';
import { MovieItemDefinition } from '../../types/movie.d';

const MovieList = () => {
  const [movies, setMovies] = useRecoilState<MovieItemDefinition[]>(moviesState);
  const bookmarkedMovies = useRecoilValue(bookMarkState);
  const keyword = useRecoilValue(keywordState);
  const [page, setPage] = useState(2);

  // 무한 스크롤
  const onScrollHandler = useCallback(
    async (e: UIEvent<HTMLElement>) => {
      const scrollPosition = e.currentTarget.scrollTop + e.currentTarget.clientHeight;
      if (scrollPosition === e.currentTarget.scrollHeight) {
        let nextPageMovies: MovieItemDefinition[];
        try {
          nextPageMovies = await getMoviesFromApi(keyword, page);
        } catch (error) {
          if (error instanceof Error) console.log(error.message);
          return;
        }
        setMovies((prevMovies) => [...prevMovies, ...nextPageMovies]);
        setPage((prevPage) => prevPage + 1);
      }
    },
    [setMovies, setPage, page, keyword]
  );

  // 검색 리스트에 북마크 된 영화 반영.
  useEffect(() => {
    let updatedMovies;
    setMovies((prevMovies) => {
      updatedMovies = prevMovies.map((prevMovie) => {
        if (bookmarkedMovies.find((bookmarkedMovie) => bookmarkedMovie.imdbID === prevMovie.imdbID)) {
          return { ...prevMovie, bookmarked: true };
        }
        return { ...prevMovie, bookmarked: false };
      });
      return [...updatedMovies];
    });
  }, [setMovies, bookmarkedMovies, keyword]);

  return (
    <ul className={classes.movielist} onScroll={onScrollHandler}>
      {movies.map((movie) => (
        <MovieItem
          title={movie.title}
          year={movie.year}
          type={movie.type}
          poster={movie.poster}
          imdbID={movie.imdbID}
          key={movie.imdbID}
          bookmarked={movie.bookmarked}
        />
      ))}
    </ul>
  );
};

export default MovieList;
