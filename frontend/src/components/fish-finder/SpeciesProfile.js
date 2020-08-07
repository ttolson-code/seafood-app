import React from 'react';
import { useParams } from 'react-router-dom';
import './css/speciesProfile.css'

const SpeciesProfile = ({ speciesList }) => {
  const params = useParams();
  const profileId = params.profileId;

  const speciesInfo = speciesList.filter(species => species['Species Name'] === profileId);
  console.log(speciesInfo[0]['Species Name']);

  return (
    <div className="species-profile-container">

      <div className="species-profile-header">
        <h1><em>{speciesInfo[0]['Scientific Name']}</em></h1>
      </div>

      <img className="fishFinder-species-profile-illustration" src={speciesInfo[0]["Species Illustration Photo"].src} alt={speciesInfo[0]["Species Illustration Photo"].alt}></img>

      <br />

      <div>
        <h3>Also known as:</h3>
        <p>
          {speciesInfo[0]["Species Aliases"].replace(/(<([^>]+)>)/ig, '')}
        </p>
      </div>

      <br />

      <div className="species-profile-quote">
        <h3>
          {speciesInfo[0]['Quote']}
        </h3>
      </div>

      <div className="species-profile-info-container">

        <div>
          <h3>Population:</h3>
          <p>
            {speciesInfo[0]["Population"]}
          </p>
        </div>

        <br />

        <div>
          <h3>Source:</h3>
          <p>
            {speciesInfo[0]["Source"].replace(/(<([^>]+)>)/ig, '')}
          </p>
        </div>

        <br />

        <div>
          <h3>Habitat Impacts:</h3>
          <p>
            {speciesInfo[0]["Habitat Impacts"]}
          </p>
        </div>

        <br />

        <div>
          <h3>Fishing Rate:</h3>
          <p>
            {speciesInfo[0]["Fishing Rate"]}
          </p>
        </div>

        <br />

        <div>
          <h3>By Catch:</h3>
          <p>
            {speciesInfo[0]["Bycatch"]}
          </p>
        </div>

        <br />

        <div>
          <h3>Availability:</h3>
          <p>
            {speciesInfo[0]["Availability"].replace(/(<([^>]+)>)/ig, '')}
          </p>
        </div>

        <br />

        <div>
          <h3>Color:</h3>
          <p>
          {!speciesInfo[0]["Color"] ? "N/A" : speciesInfo[0]["Color"].replace(/(<([^>]+)>)/ig, '')}
          </p>
        </div>
    
        <br />

        <div>
          <h3>Taste:</h3>
          <p>
            {speciesInfo[0]["Taste"].replace(/(<([^>]+)>)/ig, '')}
          </p>
        </div>
    
        <br />

        <div>
          <h3>Texture:</h3>
          <p>
            {!speciesInfo[0]["Texture"] ? "N/A" : speciesInfo[0]["Texture"].replace(/(<([^>]+)>)/ig, '')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeciesProfile;