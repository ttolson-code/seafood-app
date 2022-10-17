import React from 'react';
import SpeciesCard from './SpeciesCard';
import './css/speciesList.css';

const SpeciesList = ({ speciesData, setFilter }) => {
  const renderSpeciesCards = (speciesData) => {
    // Ensure data is an Array (prevents individual species data from being passed)
    if (Array.isArray(speciesData)) {
      return speciesData.map((species) => {
        return (
          <SpeciesCard
            key={species._id}
            speciesId={species._id}
            illustration={species['Species Illustration Photo']}
            name={species['Species Name']}
            alias={species['Species Aliases'].replace(/(<([^>]+)>)/gi, '')}
            harvestType={species['Harvest Type']}
            path={species['Path']}
            setFilter={setFilter}
          />
        );
      });
    }
  };

  return (
    <div className="fishFinder-species-container">
      <ul className="fishFinder-species-grid">
        {renderSpeciesCards(speciesData)}
      </ul>
    </div>
  );
};

export default SpeciesList;
