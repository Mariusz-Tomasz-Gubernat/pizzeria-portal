import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './LogButton.scss';
import {NavLink} from 'react-router-dom';

const LogButton = () => (
  <Button  type="submit" 
    component={NavLink} 
    className={styles.component} 
    color="primary" variant="contained" exact to='/' 
    activeClassName='active'>Log in</Button>
);

export default LogButton;