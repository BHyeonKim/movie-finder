import classes from './MovieList.module.scss';

import MovieItem from '../MovieItem/MovieItem';

const MovieList = () => {
  return (
    <ul className={classes.movielist}>
      <MovieItem />
    </ul>
  );
};

export default MovieList;
