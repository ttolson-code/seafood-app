import React from 'react';
import AppNav from '../app/AppNav';
import './css/appHeader.css'

const AppHeader = () => {
  return (
    <div className="appHeader-container">
      <h1 className="appHeader">Seafood App</h1>
      <AppNav/>
    </div>
  );
}

export default AppHeader;