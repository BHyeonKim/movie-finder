import { useState } from 'react';

import { Star } from '../../assets/svgs';

import classes from './MovieItem.module.scss';

const MovieItem = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const enterMenuHandler = () => {
    setIsClicked(true);
  };

  const clickBookmarkHandler = () => {
    setIsBookmarked((prev) => !prev);
  };

  const exitMenuHandler = () => {
    setIsClicked(false);
  };

  return (
    <li>
      {isClicked ? (
        <div className={classes.movieitem}>
          <div className={classes.movieitem__image}>
            <img src={`${process.env.PUBLIC_URL}/images/ironman.jpg`} alt='ironman' />
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
            <img src={`${process.env.PUBLIC_URL}/images/ironman.jpg`} alt='ironman' />
          </div>
          <div className={isClicked ? classes.movieitem__bookmark : classes.movieitem__info}>
            <h1 className={classes['movieitem__info--title']}>아이언맨</h1>
            <div className={classes['movieitem__info--year']}>2008- 2012</div>
            <div className={classes['movieitem__info--type']}>TV series</div>
          </div>
        </button>
      )}
    </li>
  );
};

export default MovieItem;
