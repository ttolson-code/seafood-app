import React, { useState, useEffect }  from 'react';
import { SpeciesProvider } from './SpeciesContext';

function FetchSpeciesData() {
  
  // Initial State inside our hook is empty Object.
  let [speciesData, setSpecies] = useState({});

   // Fetch function. Returns a promise. 
  async function fetchSpecies() {
    const res = await fetch(`http://localhost:5000/species/all`);
    const resJson = await res.json();
    setSpecies(resJson)
  }

  useEffect(() => {
    fetchSpecies();
  }, []);

  // Return object that has species data and fetchSpecies function.
  return { speciesData, fetchSpecies };
}

export default function SpeciesData({ children }) {
  const hookInformation = FetchSpeciesData();

  return (
    <SpeciesProvider value={hookInformation}>
      <div className="SpeciesFinder">{children}</div>
    </SpeciesProvider>
  );
}