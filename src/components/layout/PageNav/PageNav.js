import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './PageNav.module.scss';

const PageNav = () => (
  <nav className={styles.component}>
    <NavLink className={styles.navLink} exact to='/' activeClassName='active'>Home</NavLink>
    <NavLink className={styles.navLink} exact to='/login' activeClassName='active'>Login</NavLink>
    <NavLink className={styles.navLink} exact to='/kitchen' activeClassName='active'>Kitchen</NavLink>
    <NavLink className={styles.navLink} exact to='/tables' activeClassName='active'>Tables</NavLink>
    <NavLink className={styles.navLink} exact to='/waiter' activeClassName='active'>Waiter</NavLink>
  </nav>
);

export default PageNav;