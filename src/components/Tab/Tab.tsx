import { useState } from 'react';

import { BookMark, Search } from '../../assets/svgs';
import classes from './Tab.module.scss';

const Tab = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleChangeHandler = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <button type='button' className={classes.tab} onClick={toggleChangeHandler}>
      <div className={classes.tab__icon}>
        <Search className={classes.search} />
      </div>
      <div className={classes.tab__icon}>
        <BookMark className={classes.bookmark} />
      </div>
      <div className={isClicked ? classes.slider : classes['slider--active']} />
    </button>
  );
};

export default Tab;
