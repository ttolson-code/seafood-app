import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import species from '../../apis/species';
import './css/fishFinderNav.css'

const AutoComplete = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(timerId);
    }
  }, [searchText]);

  useEffect(() => {
    const search = async () => {
      const { data } = await species.get(`/fish-finder/search/${debouncedSearchText}`);
      
      if (data) {
        setResults(data);
      };
    };

    if (debouncedSearchText) {
      search();
    } else {
      setResults([]);
    }
  }, [debouncedSearchText]);

  const renderSearchResults = (results) => {
    return results.map((item) => {
      return (
        <option value={item["Species Name"]}></option>
      );
    });
  }

  return (
    <>
      <label className="fishFinder-search-box-label" htmlFor="Search-box">Find Species:</label>
      <input 
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        type="search"
        className="fishFinder-search-box"
        list="results"
      />
      
      <datalist id="results">
        {renderSearchResults(results)}
      </datalist>
    </>
  )
}

const FishFinderNav = ({ handleFilterChange }) => {
  return (
    <div className="fishFinder-nav-container">
      <div className="fishFinder-search-container">
        <AutoComplete />
      </div>
      <div className="fishFinder-filter-container">
        <NavLink to="/fish-finder/species/all" className="fishFinder-filter-button" onClick={() => handleFilterChange('all')}>All</NavLink>
        <NavLink to="/fish-finder/species/wild" className="fishFinder-filter-button" onClick={() => handleFilterChange('wild')}>Wild</NavLink>
        <NavLink to="/fish-finder/species/farmed" className="fishFinder-filter-button" onClick={() => handleFilterChange('farmed')}>Farmed</NavLink>
      </div>
    </div>  
  );
}

export default FishFinderNav;