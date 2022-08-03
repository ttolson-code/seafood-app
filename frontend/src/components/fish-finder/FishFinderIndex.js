
import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import AppHeader from '../app/AppHeader';
import FishFinderNav from '../fish-finder/FishFinderNav';
import FishFinderBanner from '../fish-finder/FishFinderBanner';
import SpeciesList from './SpeciesList';
import SpeciesProfile from './SpeciesProfile';
import species from '../../apis/species';
import PageSpinner from '../app/PageSpinner';
import './css/fishFinderIndex.css'

const FishFinderIndex = () => {
  const params = useParams();
  const currentPage = params["*"]
  const [filter, setFilter] = useState(`${currentPage}`);
  const [speciesList, setSpeciesList] = useState({});
  const [speciesId, setSpeciesId] = useState('');
  const [speciesName, setSpeciesName] = useState('');
  const [loading, setLoading] = useState(true);
  
  const fetchFishFinderAPI = async (filter) => {
    setLoading(true)

    const response = await species.get(`/fish-finder/species/${filter}`);
    
    setSpeciesList(response.data);
    setLoading(false);
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
  
  // Helper function to handle passing selected species Id to SpeciesProfile component.
  const handleSelectedSpecies = (id, name) => {
    setSpeciesId(id);
    setSpeciesName(name);
  }

  return (
    <main className="fishFinder-container">
      <AppHeader />
      <FishFinderBanner speciesName={speciesName} />
      {/* Passing 'key' prop only to reset FishFinderNav's state on each rerender. Clears searchText and results. */}
      <FishFinderNav key={currentPage} handleFilterChange={handleFilterChange} handleSelectedSpecies={handleSelectedSpecies} />
      { loading ? (
        <PageSpinner />
      ) : (
        <Routes>
          <Route path="all" element={<SpeciesList speciesList={speciesList} handleSelectedSpecies={handleSelectedSpecies} />} />
          <Route path="wild" element={<SpeciesList speciesList={speciesList} handleSelectedSpecies={handleSelectedSpecies}/>} />
          <Route path="farmed" element={<SpeciesList speciesList={speciesList} handleSelectedSpecies={handleSelectedSpecies}/>} />
          <Route path=":speciesId" element={<SpeciesProfile speciesId={speciesId} />} />
        </Routes>
      )}
    </main>
  );
};

export default FishFinderIndex;