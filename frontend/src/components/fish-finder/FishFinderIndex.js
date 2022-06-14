
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppHeader from '../app/AppHeader';
import FishFinderNav from '../fish-finder/FishFinderNav';
import FishFinderBanner from '../fish-finder/FishFinderBanner';
import SpeciesList from './SpeciesList';
import SpeciesProfile from './SpeciesProfile';
import species from '../../apis/species';
import './css/fishFinderIndex.css'

const FishFinderIndex = () => {
  const [filter, setFilter] = useState('all');
  const [speciesList, setSpeciesList] = useState({});
  const [loading, setLoading] = useState(false);
  
  async function fetchFishFinderAPI(filter) {
    // const res = await fetch('https://api.seafood-app.com/fish-finder/all-profiles');
    const response = await species.get(`/fish-finder/profiles/${filter}`);
    
    setSpeciesList(response.data);
    setLoading(true);
  }

  useEffect(() => {
    if (filter) {
      fetchFishFinderAPI(filter);
    }
  }, [filter]);
  
  // Helper function to handle species profile filter change (all, wild, farmed).
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  }

  if (!loading) {
    return (
      <div className="fishFinder-loader-container">
        <div className="fishFinder-loader"></div>
      </div>
    )
  }

  return (
    <main className="fishFinder-container">
      <AppHeader />
      <FishFinderBanner />
      <FishFinderNav handleFilterChange={handleFilterChange} s/>
      <Routes>
        <Route path="all" element={<SpeciesList speciesList={speciesList} />} />
        <Route path="wild" element={<SpeciesList speciesList={speciesList} />} />
        <Route path="farmed" element={<SpeciesList speciesList={speciesList} />} />
        <Route path=":speciesId" element={<SpeciesProfile speciesList={speciesList}/>} />
      </Routes>
    </main>
  );
};

export default FishFinderIndex;