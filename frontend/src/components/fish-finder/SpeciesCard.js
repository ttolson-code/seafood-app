import React from 'react';
import { Link } from 'react-router-dom';
import './css/speciesCard.css'

const SpeciesCard = (props) => {
  // Uses "path" data from fishwatch.gov. Example: /profiles/atlantic-salmon
  const path = props.path;

  return (
    <li className="fishFinder-species-card">
      <Link className="fishFinder-species-card-link" to={`/fish-finder${path}`}>
        <div className="fishFinder-species-card-content">
          {props.harvestType === "Farmed" && 
            <div className="fishFinder-species-card-farmed-tag"><p>Farmed</p></div>
          }
          <img className="fishFinder-species-card-illustration" src={props.illustration.src} alt={props.illustration.alt}></img>
          <h2 className="fishFinder-species-card-heading">{props.name}</h2>
          <p className="fishFinder-species-card-alias">{props.alias}</p>
        </div>
      </Link>
    </li>
  )
}

export default SpeciesCard;