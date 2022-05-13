import { useRecoilValue } from 'recoil';
import { bookMarkState } from '../../state/moviesState';
import MovieItem from '../MovieItem/MovieItem';
import classes from './Bookmark.module.scss';

const Bookmark = () => {
  const movies = useRecoilValue(bookMarkState);

  return (
    <div className={classes.bookmark}>
      <h1 className={classes.bookmark__title}>내 줄겨찾기</h1>
      <ul className={classes.bookmark__list}>
        {movies.map((movie) => (
          <MovieItem
            title={movie.title}
            year={movie.year}
            type={movie.type}
            poster={movie.poster}
            imdbID={movie.imdbID}
            bookmarked={movie.bookmarked}
            key={movie.imdbID}
          />
        ))}
      </ul>
    </div>
  );
};

export default Bookmark;
