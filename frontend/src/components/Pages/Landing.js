import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FishFinder from './FishFinder'
import './Landing.css'


export default function Landing() {
  return (
 
    <div className="Landing-container">
      <div className="Landing-title-container">
        <h1 className="Landing-title">Seafood App</h1>
      </div>
    
      <div className="Landing-button-container">
        <button className="Landing-button">
          <Link to="/species/all">Fish Finder</Link>
        </button>
        <button className="Landing-button">
          <Link to="/species/all">News</Link>
        </button>
      </div>
    </div>

  );
}