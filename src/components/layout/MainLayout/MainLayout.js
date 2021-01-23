import React from 'react';
import PageNav from '../PageNav/PageNav';
import PropTypes from 'prop-types';

const MainLayout = ({...props}) => {
  return (
    <div>
      {props.children}
      <PageNav />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;