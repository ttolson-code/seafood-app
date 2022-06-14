import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import species from '../../apis/species';
import './css/speciesProfile.css'

const SpeciesProfile = () => {
  const [speciesData, setSpeciesData] = useState('');
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const speciesId = params.speciesId;

  async function fetchFishFinderAPI(speciesId) {
    const response = await species.get(`/fish-finder/species/${speciesId}`);
    setSpeciesData(response.data)
    setLoading(true);
  }

  useEffect(() => {
    if (speciesId) {
      fetchFishFinderAPI(speciesId);
    }
  }, [speciesId]);

  if (!loading) {
    return (
      <div className="fishFinder-loader-container">
        <div className="fishFinder-loader"></div>
      </div>
    )
  }

  return (
    <div className="species-profile-container">
      <img className="fishFinder-species-profile-illustration" src={speciesData["Species Illustration Photo"].src} alt={speciesData["Species Illustration Photo"].alt}></img>

      <div className="species-profile-scientific">
        <h1><em>{speciesData['Scientific Name']}</em></h1>
      </div>

      <div className="species-profile-alias">
        <h3>Also known as:</h3>
        <p>
          {speciesData["Species Aliases"].replace(/(<([^>]+)>)/ig, '')}
        </p>
      </div>

      <div className="species-profile-quote">
        <h3>
          {speciesData["Quote"]}
        </h3>
      </div>

      <div className="species-profile-info-container">

        <h2>Harvest Information</h2>

        <table>
          <tbody>
            <tr>
              <th>Population:</th>
              <td>{!speciesData["Population"] ? "N/A" : speciesData["Population"]}</td>
            </tr>
            <tr>
              <th>Source:</th>
              <td>{!speciesData["Source"] ? "N/A" : speciesData["Source"].replace(/(<([^>]+)>)/ig, '')}</td>
            </tr>
            <tr>
              <th>Habitat Impacts:</th>
              <td>{!speciesData["Habitat Impacts"] ? "N/A" : speciesData["Habitat Impacts"]}</td>
            </tr>
            <tr>
              <th>Fishing Rate:</th>
              <td>{!speciesData["Fishing Rate"] ? "N/A" : speciesData["Fishing Rate"]}</td>
            </tr>
            <tr>
              <th>By Catch:</th>
              <td>{!speciesData["ByCatch"] ? "N/A" : speciesData["Bycatch"]}</td>
            </tr>
          </tbody>
        </table>

        <h2>Market Information</h2>

        <table>
          <tbody>
            <tr>
              <th>Availability:</th>
              <td>{!speciesData["Availability"] ? "N/A" : speciesData["Availability"].replace(/(<([^>]+)>)/ig, '')}</td>
            </tr>
            <tr>
              <th>Color:</th>
              <td>{!speciesData["Color"] ? "N/A" : speciesData["Color"].replace(/(<([^>]+)>)/ig, '')}</td>
            </tr>
            <tr>
              <th>Taste:</th>
              <td>{!speciesData["Taste"] ? "N/A" : speciesData["Taste"].replace(/(<([^>]+)>)/ig, '')}</td>
            </tr>
            <tr>
              <th>Texture:</th>
              <td>{!speciesData["Texture"] ? "N/A" : speciesData["Texture"].replace(/(<([^>]+)>)/ig, '')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpeciesProfile;