import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Landing  from './Pages/Landing';
import FishFinder from './Pages/FishFinder'
import SpeciesPage from './FishFinder/SpeciesPage';
import SpeciesGrid from './FishFinder/SpeciesGrid';
import './App.css'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path={"/species/all"} component={FishFinder} />
        <Route exact path={"/species/wild"} component={FishFinder} />
        <Route exact path={"/species/farmed"} component={FishFinder} />
        <Route path="/species/:id" component={SpeciesPage} />
      </Switch>
    </Router>
  );
}