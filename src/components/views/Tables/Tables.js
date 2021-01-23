import React from 'react';
import styles from './Tables.module.scss';
import {Link} from 'react-router-dom';

const Tables = () => {
  return (
    <div className={styles.component}>
      <h2>Tables VIEW</h2>
      <Link className={styles.link} to='/tables/booking/:id' activeClassName='active'>Table info</Link>
      <Link className={styles.link} to='/tables/booking/new' activeClassName='active'>Book new table</Link>
      <Link className={styles.link} to='/tables/booking/:id' activeClassName='active'>Event info</Link>
      <Link className={styles.link} to='/tables/events/new' activeClassName='active'>Book new event</Link>
    </div>
  );
};

export default Tables;