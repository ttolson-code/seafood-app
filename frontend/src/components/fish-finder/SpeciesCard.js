import React from 'react';
import { Link } from 'react-router-dom';
import './css/speciesCard.css';

const SpeciesCard = ({ speciesId, harvestType, illustration, name, alias, handleSelectedSpecies }) => {
  return (
    <li className="fishFinder-species-card">
      <Link className="fishFinder-species-card-link" to={`/fish-finder/species/${speciesId}`} onClick={() => handleSelectedSpecies(speciesId)}>
        <div className="fishFinder-species-card-content">
          {harvestType === "Farmed" && 
            <div className="fishFinder-species-card-farmed-tag"><p>Farmed</p></div>
          }
          <img className="fishFinder-species-card-illustration" src={illustration.src} alt={illustration.alt}></img>
          <h2 className="fishFinder-species-card-heading">{name}</h2>
          <p className="fishFinder-species-card-alias">{alias}</p>
        </div>
      </Link>
    </li>
  )
};

export default SpeciesCard;