import React from 'react';
import './css/appHeader.css'

const AppHeader = ({ headerText }) => {
  // Remove "/" from url.
  // Replace any "-" (hypens) with a space.
  // Uppercase first letter of words done via CSS.
  const headerTextFormat = headerText.substr(1).replace(/-/g, ' '); 

  return (
    <div className="appHeader-container">
      <h1 className="appHeader">{headerTextFormat}</h1>
    </div>
  );
}

export default AppHeader;