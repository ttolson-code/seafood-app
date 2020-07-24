import React, {useContext} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { SpeciesContext } from './SpeciesContext';
import Header from '../Header/Header';
import SpeciesSearch from '../FishFinder/SpeciesSearch';
import SpeciesBanner from '../FishFinder/SpeciesBanner';
import './SpeciesPage.css'

export default function SpeciesPage() {
  let { id } = useParams();
  console.log(id);
  // const { speciesData } = useContext(SpeciesContext);

  // function renderSpeciesCard()  {
  //   return Object.keys(speciesData).map((key) => {
  //     const species = speciesData[key];

  //     return (
  //       <SpeciesCard
  //          key={species._id}
  //          illustration={species["Species Illustration Photo"]}
  //          name={species["Species Name"]}
  //          alias={species["Species Aliases"].replace(/(<([^>]+)>)/ig, '')}
  //          harvestType={species["Harvest Type"]}
  //       />
  //     );
  //   });
  // }

  return (
    <React.StrictMode>
      <Header />
      <SpeciesSearch />
      <SpeciesBanner />
      <h1>Hello</h1> 
    </React.StrictMode>
  );
}