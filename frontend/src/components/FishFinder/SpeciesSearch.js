import React, {useContext} from 'react';
import { SpeciesContext } from './SpeciesContext';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './speciesSearch.css'

export default function SpeciesSearch(props) {
  // const { fetchSpecies } = useContext(SpeciesContext);

  return (
    <div className="Search-container">
      <label className="Search-box-label" htmlFor="Search-box">Find Species:</label>
      <input className="Search-box" type="text"/>
      <button className="Search-filter-button">
        <Link to="/species/all">All</Link>
      </button>
      <button className="Search-filter-button">
        <Link to="/species/wild">Wild</Link>
      </button>
      <button className="Search-filter-button">
        <Link to="/species/farmed">Farmed</Link>
      </button>
    </div>  
  );
}
