import React from 'react';
import PageNav from '../PageNav/PageNav';

const MainLayout = ({...props}) => {
  return (
    <div>
      {props.children}
      <PageNav />
    </div>
  );
};

export default MainLayout;