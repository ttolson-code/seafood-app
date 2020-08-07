import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppHeader from '../app/AppHeader';

const NewsIndex = () => {
  let route = useRouteMatch();

  return (
    <div className="news-container">
      <AppHeader headerText={route.url}/>
    </div>
  );
};

export default NewsIndex;