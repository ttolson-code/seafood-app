import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import species from '../../apis/species';
import './css/fishFinderNav.css';

const AutoComplete = ({ setFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [results, setResults] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  useEffect(() => {
    const search = async () => {
      const { data } = await species.get(
        `/fish-finder/search/${debouncedSearchText}`
      );

      if (data) {
        setResults(data);
      }
    };

    if (debouncedSearchText) {
      search();
    } else {
      setResults([]);
    }
  }, [debouncedSearchText]);

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setResults([]);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });

    // useEffect cleanup function
    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderSearchResults = (results) => {
    return results.map((item) => {
      return (
        <NavLink
          key={item._id}
          className="autocomplete-item"
          to={`/fish-finder/species/${item._id}`}
          value={item['Species Name']}
          onClick={() => {
            setFilter(item._id);
          }}
        >
          <div className="autocomplete-item-image-wrapper">
            <img
              className=""
              src={item['Species Illustration Photo'].src}
              alt={item['Species Illustration Photo'].alt}
            ></img>
          </div>
          <div>
            <h4>{item['Species Name']}</h4>
            <p>{item['Species Aliases'].replace(/(<([^>]+)>)/gi, '')}</p>
          </div>
        </NavLink>
      );
    });
  };

  return (
    <>
      {/* <label className="fishFinder-search-box-label" htmlFor="Search-box">Find Species:</label> */}
      <div ref={ref} className="autocomplete-wrapper">
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          type="search"
          className="fishFinder-search-box"
          list="results"
        />
        <div className="autocomplete-results">
          {renderSearchResults(results)}
        </div>
      </div>
    </>
  );
};

const FishFinderNav = ({ setFilter }) => {
  return (
    <div className="fishFinder-nav-container">
      <div className="fishFinder-search-container">
        <AutoComplete setFilter={setFilter} />
      </div>
      <div className="fishFinder-filter-container">
        <NavLink
          to="/fish-finder/species/all"
          className="fishFinder-filter-button"
          onClick={() => setFilter('all')}
        >
          All
        </NavLink>
        <NavLink
          to="/fish-finder/species/wild"
          className="fishFinder-filter-button"
          onClick={() => setFilter('wild')}
        >
          Wild
        </NavLink>
        <NavLink
          to="/fish-finder/species/farmed"
          className="fishFinder-filter-button"
          onClick={() => setFilter('farmed')}
        >
          Farmed
        </NavLink>
      </div>
    </div>
  );
};

export default FishFinderNav;
