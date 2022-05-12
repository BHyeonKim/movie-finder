import { FC, useState } from 'react';

import { MovieItemProps } from '../../types/props.d';
import { Star } from '../../assets/svgs';

import classes from './MovieItem.module.scss';

const MovieItem: FC<MovieItemProps> = ({ title, year, type, poster }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const enterMenuHandler = () => {
    setIsClicked(true);
  };

  const clickBookmarkHandler = () => {
    setIsBookmarked((prev) => !prev);
    setIsClicked(false);
  };

  const exitMenuHandler = () => {
    setIsClicked(false);
  };

  return (
    <li>
      {isClicked ? (
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
