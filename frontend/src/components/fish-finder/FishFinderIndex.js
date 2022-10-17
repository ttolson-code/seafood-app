import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import AppHeader from '../app/AppHeader';
import FishFinderNav from '../fish-finder/FishFinderNav';
import FishFinderBanner from '../fish-finder/FishFinderBanner';
import SpeciesList from './SpeciesList';
import SpeciesProfile from './SpeciesProfile';
import species from '../../apis/species';
import PageSpinner from '../app/PageSpinner';
import './css/fishFinderIndex.css';

const FishFinderIndex = () => {
  const params = useParams();
  const currentPage = params['*'];
  const [filter, setFilter] = useState(currentPage); // 'all', 'wild', 'farmed', or speciesId
  const [speciesData, setSpeciesData] = useState({});
  const [speciesName, setSpeciesName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchFishFinderAPI = async (filter) => {
    setLoading(true);

    const response = await species.get(`/fish-finder/species/${filter}`);

    setSpeciesData(response.data);

    if (!Array.isArray(response.data)) {
      setSpeciesName(response.data['Species Name']);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (filter) {
      fetchFishFinderAPI(filter);
    }
  }, [filter]);

  return (
    <main className="fishFinder-container">
      <AppHeader />
      <FishFinderBanner speciesName={speciesName} />
      {/* Passing 'key' prop only to reset FishFinderNav's state on each rerender. Clears searchText and results. */}
      <FishFinderNav key={currentPage} setFilter={setFilter} />
      {loading ? (
        <PageSpinner />
      ) : (
        <Routes>
          <Route
            path="all"
            element={
              <SpeciesList speciesData={speciesData} setFilter={setFilter} />
            }
          />
          <Route
            path="wild"
            element={
              <SpeciesList speciesData={speciesData} setFilter={setFilter} />
            }
          />
          <Route
            path="farmed"
            element={
              <SpeciesList speciesData={speciesData} setFilter={setFilter} />
            }
          />
          <Route
            path=":speciesId"
            element={<SpeciesProfile speciesData={speciesData} />}
          />
        </Routes>
      )}
    </main>
  );
};

export default FishFinderIndex;
