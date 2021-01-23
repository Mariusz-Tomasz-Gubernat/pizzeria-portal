import React from 'react';
import styles from './PageNav.module.scss';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const PageNav = () => (
  <nav className={styles.component}>
    <Button component={NavLink} className={styles.navLink} exact to='/' activeClassName='active'>Home</Button>
    <Button component={NavLink} className={styles.navLink} exact to='/login' activeClassName='active'>Login</Button>
    <Button component={NavLink} className={styles.navLink} exact to='/kitchen' activeClassName='active'>Kitchen</Button>
    <Button component={NavLink} className={styles.navLink} exact to='/tables' activeClassName='active'>Tables</Button>
    <Button component={NavLink} className={styles.navLink} exact to='/waiter' activeClassName='active'>Waiter</Button>
  </nav>
);

export default PageNav;