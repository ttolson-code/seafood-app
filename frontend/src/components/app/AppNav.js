import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/appNav.css'

const AppNav = () => {
  return(
    <nav className="appNav-container">
      <NavLink exact to="/" className="appNav-link">Home</NavLink>
      <NavLink 
        to="/fish-finder/profiles/all-profiles" 
        className="appNav-link" 
        isActive={() => { 
          if(window.location.pathname.includes("fish-finder")) {
            return true;
          }
        }}
      >
        Fish Finder
      </NavLink>
      <NavLink to="/news" className="appNav-link">News</NavLink>
    </nav>
  )
}

export default AppNav;