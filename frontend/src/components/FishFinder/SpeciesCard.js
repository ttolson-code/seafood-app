import React, {useContext} from 'react';
import { SpeciesContext } from './SpeciesContext';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './speciesCard.css'

export default function SpeciesCard(props) {

  return (
    <li className="Species-card">
        <Link className="Species-card-link" to={"/species/" + props.name} >
          <div className="Species-card-content">
            {props.harvestType === "Farmed" && 
              <div className="Farmed-tag"><p>Farmed</p></div>
            }
            <img className="Species-card-illustration" src={props.illustration.src} alt={props.illustration.alt}></img>
            <h2 className="Species-card-heading">{props.name}</h2>
            <p className="Species-card-alias">{props.alias}</p>
          </div>
        </Link>
    </li>
  )
}