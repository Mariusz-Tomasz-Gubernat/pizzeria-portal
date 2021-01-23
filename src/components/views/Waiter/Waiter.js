import React from 'react';
import styles from './Waiter.module.scss';
import {Link} from 'react-router-dom';

const Waiter = () => {
  return (
    <div className={styles.component}>
      <h2>Waiter VIEW</h2>
      <Link className={styles.link} to='/waiter/order/:id' activeClassName='active'>Order info</Link>
      <Link className={styles.link} to='/waiter/order/new' activeClassName='active'>New order</Link>
    </div>
  );
};

export default Waiter;