import React from 'react';
import { useParams } from 'react-router-dom';
import SpeciesCard from './SpeciesCard';
import './css/speciesList.css'


export default function SpeciesList({ speciesList }) {
  const params = useParams();
  const profileId = params.profileId;

  const filterWild = speciesList.filter(species => species["Harvest Type"] === "Wild")
  const filterFarmed = speciesList.filter(species => species["Harvest Type"] === "Farmed")

  let filteredSpeciesList;
  
  switch(profileId) {
    case 'wild-profiles':
      filteredSpeciesList = filterWild;
      break;
    case 'farmed-profiles':
      filteredSpeciesList = filterFarmed;
      break;
    default: 
      filteredSpeciesList = speciesList;
  }

  function renderSpeciesCard(filteredSpeciesList)  {
    return filteredSpeciesList.map((species) => {
      return (
        <SpeciesCard
          key={species._id}
          illustration={species["Species Illustration Photo"]}
          name={species["Species Name"]}
          alias={species["Species Aliases"].replace(/(<([^>]+)>)/ig, '')}
          harvestType={species["Harvest Type"]}
        />
      );
    });
  
  }
        
  return (
    <div className="fishFinder-species-container">
      <ul className="fishFinder-species-grid">
        {renderSpeciesCard(filteredSpeciesList)}
      </ul>
    </div>
  );
}