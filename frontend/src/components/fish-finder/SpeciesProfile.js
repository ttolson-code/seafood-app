import React from 'react';
import { useParams } from 'react-router-dom';
import './css/speciesProfile.css'

const SpeciesProfile = ({ speciesList }) => {
  const params = useParams();

  const speciesId = params.speciesId;
  const speciesFind = speciesList.filter(species => species['Path'] === `/profiles/${speciesId}`);
  const speciesInfo = speciesFind[0];

  return (
    <div className="species-profile-container">

      <img className="fishFinder-species-profile-illustration" src={speciesInfo["Species Illustration Photo"].src} alt={speciesInfo["Species Illustration Photo"].alt}></img>

      <div className="species-profile-scientific">
        <h1><em>{speciesInfo['Scientific Name']}</em></h1>
      </div>

      <div className="species-profile-alias">
        <h3>Also known as:</h3>
        <p>
          {speciesInfo["Species Aliases"].replace(/(<([^>]+)>)/ig, '')}
        </p>
      </div>

      <div className="species-profile-quote">
        <h3>
          {speciesInfo['Quote']}
        </h3>
      </div>

      <div className="species-profile-info-container">

        <h2>Harvest Information</h2>

        <table>
          <tr>
            <th>Population:</th>
            <td>{speciesInfo["Population"]}</td>
          </tr>
          <tr>
            <th>Source:</th>
            <td>{speciesInfo["Source"].replace(/(<([^>]+)>)/ig, '')}</td>
          </tr>
          <tr>
            <th>Habitat Impacts:</th>
            <td>{speciesInfo["Habitat Impacts"]}</td>
          </tr>
          <tr>
            <th>Fishing Rate:</th>
            <td>{speciesInfo["Fishing Rate"]}</td>
          </tr>
          <tr>
            <th>By Catch:</th>
            <td>{speciesInfo["Bycatch"]}</td>
          </tr>
        </table>

        <h2>Market Information</h2>

        <table>
          <tr>
            <th>Availability:</th>
            <td>{speciesInfo["Availability"].replace(/(<([^>]+)>)/ig, '')}</td>
          </tr>
          <tr>
            <th>Color:</th>
            <td>{!speciesInfo["Color"] ? "N/A" : speciesInfo["Color"].replace(/(<([^>]+)>)/ig, '')}</td>
          </tr>
          <tr>
            <th>Taste:</th>
            <td>{!speciesInfo["Taste"] ? "N/A" : speciesInfo["Taste"].replace(/(<([^>]+)>)/ig, '')}</td>
          </tr>
          <tr>
            <th>Texture:</th>
            <td>{!speciesInfo["Texture"] ? "N/A" : speciesInfo["Texture"].replace(/(<([^>]+)>)/ig, '')}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default SpeciesProfile;