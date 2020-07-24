import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import Header from '../Header/Header';
import SpeciesData from '../FishFinder/SpeciesData';
import SpeciesGrid from '../FishFinder/SpeciesGrid';
import SpeciesPage from '../FishFinder/SpeciesPage';
import './FishFinder.css'

export default function FishFinder(props) {
  let { id } = useParams();
  console.log(id);

  return (
    <React.StrictMode>
      <SpeciesData>
        <SpeciesGrid />
      </SpeciesData> 
    </React.StrictMode>
  );
}