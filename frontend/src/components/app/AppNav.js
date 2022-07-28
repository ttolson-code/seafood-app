import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './css/appNav.css'

const AppNav = () => {
  // Extract pathname from location.
  const { pathname } = useLocation();
  // Split path into array.
  const pathnameArray = pathname.split('/');
  // See if array includes 'fish-finder' aka see if current path includes 'fish-finder'.
  const isActive = pathnameArray.includes('fish-finder');
  
  return(
    <nav className="appNav-container">
      <NavLink to="/" className="appNav-link">Home</NavLink>
      <NavLink 
        to="/fish-finder/species/all"
        className={`appNav-link ${isActive ? 'active' : ''}`}
      >
        Fish Finder
      </NavLink>
      <NavLink to="/news" className="appNav-link">News</NavLink>
    </nav>
  )
}

export default AppNav;