import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/fishFinderNav.css'

const FishFinderNav = () => {

  return (
    <div className="fishFinder-search-container">
      <label className="fishFinder-search-box-label" htmlFor="Search-box">Find Species:</label>
      <input className="fishFinder-search-box" type="text"/>
    
      <NavLink to="/fish-finder/all-profiles" className="fishFinder-search-filter-button">All</NavLink>
      <NavLink to="/fish-finder/wild-profiles" className="fishFinder-search-filter-button">Wild</NavLink>
      <NavLink to="/fish-finder/farmed-profiles" className="fishFinder-search-filter-button">Farmed</NavLink>
    </div>  
  );
}

export default FishFinderNav;