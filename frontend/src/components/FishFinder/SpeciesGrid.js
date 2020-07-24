import React, {useContext} from 'react';
import { SpeciesContext } from './SpeciesContext';
import Header from '../Header/Header';
import SpeciesSearch from '../FishFinder/SpeciesSearch';
import SpeciesBanner from '../FishFinder/SpeciesBanner';
import SpeciesCard from './SpeciesCard';
import './speciesGrid.css'


export default function SpeciesGrid() {
  const { speciesData } = useContext(SpeciesContext);

  function renderSpeciesCard()  {
    return Object.keys(speciesData).map((key) => {
      const species = speciesData[key];

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
    <React.StrictMode>
      <Header />
      <SpeciesSearch />
      <SpeciesBanner />
      <div className="Species-grid-container">
        <ul className="Species-grid">
          {renderSpeciesCard()}
        </ul>
      </div>
    </React.StrictMode>
  );
}