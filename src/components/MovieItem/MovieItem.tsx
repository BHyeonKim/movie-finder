import { FC, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { bookMarkState, moviesState } from '../../state/moviesState';
import { MovieItemDefinition } from '../../types/movie.d';

import classes from './MovieItem.module.scss';
import { Star } from '../../assets/svgs';

const MovieItem: FC<MovieItemDefinition> = ({ title, year, type, poster, imdbID, bookmarked }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const setMovies = useSetRecoilState(moviesState);
  const setBookmarkList = useSetRecoilState(bookMarkState);

  const enterMenuHandler = () => {
    setIsClicked(true);
  };
  const exitMenuHandler = () => {
    setIsClicked(false);
  };

  const clickBookmarkHandler = () => {
    // 북마크에 이미 추가되있을 경우 북마크 리스트에서 뺴기
    if (isBookmarked) {
      setBookmarkList((prevList) => prevList.filter((movie) => movie.imdbID !== imdbID));
      setIsBookmarked(false);
      setIsClicked(false);
    }

    // 북마크에 없을 경우 북마크 리스트에 추가하기
    if (!isBookmarked) {
      setBookmarkList((prevList) => [...prevList, { title, year, type, poster, imdbID, bookmarked: true }]);
      setMovies((movies) =>
        movies.filter((movie) => {
          if (movie.imdbID !== imdbID) {
            return movie;
          }
          return {
            ...movie,
            bookmarked: true,
          };
        })
      );
      setIsBookmarked(true);
      setIsClicked(false);

      const storedBookmarks = JSON.parse(localStorage.getItem('movies') || '[]');
      JSON.stringify([...storedBookmarks, { title, year, type, poster, imdbID, bookmarked: true }]);
    }
  };

  return (
    <li>
      {isClicked ? (
        // 영화 아이템 뒷면
        <div className={classes.movieitem}>
          <div className={classes.movieitem__image}>
            <img src={poster} alt={title} />
          </div>
          <div className={isClicked ? classes.movieitem__bookmark : classes.movieitem__info}>
            <button
              type='button'
              onClick={clickBookmarkHandler}
              className={`${classes['movieitem__bookmark--select']} ${
                isBookmarked
                  ? classes['movieitem__bookmark--select--bookmarked']
                  : classes['movieitem__bookmark--select']
              }`}
            >
              <Star
                className={`${classes['movieitem__bookmark--select--icon']} ${
                  isBookmarked ? classes['movieitem__bookmark--select--icon--bookmarked'] : ''
                }`}
              />
            </button>
            <button type='button' onClick={exitMenuHandler} className={classes['movieitem__bookmark--exit']}>
              취소
            </button>
          </div>
        </div>
      ) : (
        // 영화 아이템 앞면
        <button type='button' className={classes.movieitem} onClick={enterMenuHandler}>
          <div className={classes.movieitem__image}>
            <img src={poster} alt={title} />
          </div>
          <div className={isClicked ? classes.movieitem__bookmark : classes.movieitem__info}>
            <h1 className={classes['movieitem__info--title']}>{title}</h1>
            <div className={classes['movieitem__info--year']}>{year}</div>
            <div className={classes['movieitem__info--type']}>{type}</div>
            <Star
              className={`${classes['movieitem__info--bookmark']} ${
                isBookmarked
                  ? classes['movieitem__info--bookmark--bookmarked']
                  : classes['movieitem__info--bookmark--unbookmarked']
              }`}
            />
          </div>
        </button>
      )}
    </li>
  );
};

export default MovieItem;
