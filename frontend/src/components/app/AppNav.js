import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/appNav.css'

const AppNav = () => {
  // TODO: Make nav link active when on that page.
  return(
    <nav className="appNav-container">
      <NavLink to="/" className="appNav-link">Home</NavLink>
      <NavLink 
        to="/fish-finder/profiles/all" 
        className="appNav-link" 
      >
        Fish Finder
      </NavLink>
      <NavLink to="/news" className="appNav-link">News</NavLink>
    </nav>
  )
}

export default AppNav;