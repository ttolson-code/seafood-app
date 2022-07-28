import React from 'react';
import { Link } from 'react-router-dom';
import './css/landingPage.css'

const LandingPage = (props) => {

  return (
    <div className="landing-container">
      <div className="landing-header-container">
        <header className="landing-header">Seafood App</header>
      </div>

      <div className="landing-button-container">
        <Link className="landing-button" to="/fish-finder/species/all">Fish Finder</Link>
        <Link className="landing-button" to="/news">News</Link>
      </div>
    </div>
  );
}

export default LandingPage;