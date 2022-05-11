import { FormEvent, useState } from 'react';
import classes from './SearchBar.module.scss';

const SearchBar = () => {
  const [text, setText] = useState('');

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  const inputTextHandler = (e: FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input type='text' onChange={inputTextHandler} className={classes.input} />
    </form>
  );
};
export default SearchBar;
