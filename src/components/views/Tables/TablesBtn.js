import React from 'react';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

const TablesBtn = ({...props}) => (
  <Button  type="submit" component={NavLink} color="primary" variant="contained" exact to={props.to} activeClassName='active'><AddIcon/>{props.name}</Button>
);

TablesBtn.propTypes = {
  name: PropTypes.node,
  to: PropTypes.node,
};
export default TablesBtn;