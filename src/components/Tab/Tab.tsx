import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BookMark, Search } from '../../assets/svgs';
import classes from './Tab.module.scss';

const Tab = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { pathname } = useLocation();

  // To set slider position
  useEffect(() => {
    if (pathname === '/') setIsClicked(false);
    if (pathname === '/bookmark') setIsClicked(true);
  }, [pathname, setIsClicked]);

  const toggleChangeHandler = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <Link type='button' to={isClicked ? '/' : '/bookmark'} className={classes.tab} onClick={toggleChangeHandler}>
      <div className={classes.tab__icon}>
        <Search className={classes.search} />
      </div>
      <div className={classes.tab__icon}>
        <BookMark className={classes.bookmark} />
      </div>
      <div className={isClicked ? classes['slider--active'] : classes.slider} />
    </Link>
  );
};

export default Tab;
