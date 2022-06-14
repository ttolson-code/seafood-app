import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/fishFinderNav.css'

const FishFinderNav = ({ handleFilterChange }) => {
  return (
    <div className="fishFinder-nav-container">
      <div className="fishFinder-search-container">
        <label className="fishFinder-search-box-label" htmlFor="Search-box">Find Species:</label>
        <input className="fishFinder-search-box" type="text"/>
      </div>
      <div className="fishFinder-filter-container">
        <NavLink to="/fish-finder/profiles/all" className="fishFinder-search-filter-button" onClick={() => handleFilterChange('all')}>All</NavLink>
        <NavLink to="/fish-finder/profiles/wild" className="fishFinder-search-filter-button" onClick={() => handleFilterChange('wild')}>Wild</NavLink>
        <NavLink to="/fish-finder/profiles/farmed" className="fishFinder-search-filter-button" onClick={() => handleFilterChange('farmed')}>Farmed</NavLink>
      </div>
    </div>  
  );
}

export default FishFinderNav;