import { FC } from 'react';

import { ErrorMessage } from '../../types/error.d';

import classes from './MessageBox.module.scss';

const MessageBox: FC<ErrorMessage> = ({ message }) => {
  return (
    <div className={classes.messagebox}>
      <p className={classes.messagebox__message}>{message}</p>
    </div>
  );
};

export default MessageBox;
