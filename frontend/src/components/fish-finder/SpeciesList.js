import React from 'react';
import SpeciesCard from './SpeciesCard';
import './css/speciesList.css'

const SpeciesList = ({ speciesList, handleSelectedSpecies }) =>  {
  const renderSpeciesCards = (speciesList) => {
    return speciesList.map((species) => {
      return (
        <SpeciesCard
          key={species._id}
          speciesId={species._id}
          illustration={species["Species Illustration Photo"]}
          name={species["Species Name"]}
          alias={species["Species Aliases"].replace(/(<([^>]+)>)/ig, '')}
          harvestType={species["Harvest Type"]}
          path={species["Path"]}
          handleSelectedSpecies={handleSelectedSpecies}
        />
      );
    });
  }
        
  return (
    <div className="fishFinder-species-container">
      <ul className="fishFinder-species-grid">
        {renderSpeciesCards(speciesList)}
      </ul>
    </div>
  );
}

export default SpeciesList;