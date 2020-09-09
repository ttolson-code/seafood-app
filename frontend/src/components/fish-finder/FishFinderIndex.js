
import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AppHeader from '../app/AppHeader';
import FishFinderNav from '../fish-finder/FishFinderNav';
import FishFinderBanner from '../fish-finder/FishFinderBanner';
import SpeciesList from './SpeciesList';
import SpeciesProfile from './SpeciesProfile';
import './css/fishFinderIndex.css'

const FishFinderIndex = () => {
  const route = useRouteMatch();

  const [speciesList, setSpeciesList] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchFishFinderAPI() {
    // The fetch url needs to be made an environment variable using process.env in the brackets didnt work
    const res = await fetch('https://api.seafood-app.com/fish-finder/all-profiles');
    const resJson = await res.json();
    setSpeciesList(resJson);
    setLoading(true);
  }

  useEffect(() => {
    fetchFishFinderAPI();
  }, []);

  if (!loading) {
    return (
      <div className="fishFinder-loader-container">
        <div className="fishFinder-loader"></div>
      </div>
    )
  }

  return (
    <main className="fishFinder-container">
      <AppHeader headerText={route.url}/>
      <FishFinderNav />
      <FishFinderBanner />
      <Switch>
        {/* Use Regex to constrain route. */}
        <Route exact path="/fish-finder/profiles/:profileId(all-profiles|wild-profiles|farmed-profiles)">
          <SpeciesList speciesList={speciesList} />
        </Route> 
        
        <Route exact path="/fish-finder/profiles/:speciesId">
          <SpeciesProfile speciesList={speciesList}/>
        </Route> 

      </Switch>
    </main>
  );
};

export default FishFinderIndex;