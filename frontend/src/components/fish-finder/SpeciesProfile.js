import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import species from '../../apis/species';
import PageSpinner from '../app/PageSpinner';
import './css/speciesProfile.css';

const SpeciesProfile = ({ setSpeciesName }) => {
  const params = useParams();
  const speciesId = params['*'];
  const [speciesData, setSpeciesData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchFishFinderAPI = async (speciesId) => {
    if (typeof speciesId === 'string') {
      setLoading(true);
      const response = await species.get(`/fish-finder/species/${speciesId}`);
      setSpeciesData(response.data);
      setSpeciesName(response.data['Species Name']);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (speciesId) {
      fetchFishFinderAPI(speciesId);
    }
  }, [speciesId]);

  return (
    <>
      {loading ? (
        <PageSpinner />
      ) : (
        <div className="species-profile-container">
          <img
            className="fishFinder-species-profile-illustration"
            src={speciesData['Species Illustration Photo'].src}
            alt={speciesData['Species Illustration Photo'].alt}
          ></img>

          <div className="species-profile-scientific">
            <h1>
              <em>{speciesData['Scientific Name']}</em>
            </h1>
          </div>

          <div className="species-profile-alias">
            <h3>Also known as:</h3>
            <p>{speciesData['Species Aliases'].replace(/(<([^>]+)>)/gi, '')}</p>
          </div>

          <div
            className="species-profile-quote"
            style={{ backgroundColor: speciesData['Quote Background Color'] }}
          >
            <h3>{!speciesData['Quote'] ? 'N/A' : speciesData['Quote']}</h3>
          </div>

          <div className="species-profile-info-container">
            <h2>Harvest Information</h2>

            <table>
              <tbody>
                <tr>
                  <th>Population:</th>
                  <td>
                    {!speciesData['Population']
                      ? 'N/A'
                      : speciesData['Population']}
                  </td>
                </tr>
                <tr>
                  <th>Source:</th>
                  <td>
                    {!speciesData['Source']
                      ? 'N/A'
                      : speciesData['Source'].replace(/(<([^>]+)>)/gi, '')}
                  </td>
                </tr>
                <tr>
                  <th>Habitat Impacts:</th>
                  <td>
                    {!speciesData['Habitat Impacts']
                      ? 'N/A'
                      : speciesData['Habitat Impacts']}
                  </td>
                </tr>
                <tr>
                  <th>Fishing Rate:</th>
                  <td>
                    {!speciesData['Fishing Rate']
                      ? 'N/A'
                      : speciesData['Fishing Rate']}
                  </td>
                </tr>
                <tr>
                  <th>By Catch:</th>
                  <td>
                    {!speciesData['ByCatch'] ? 'N/A' : speciesData['Bycatch']}
                  </td>
                </tr>
              </tbody>
            </table>

            <h2>Market Information</h2>

            <table>
              <tbody>
                <tr>
                  <th>Availability:</th>
                  <td>
                    {!speciesData['Availability']
                      ? 'N/A'
                      : speciesData['Availability'].replace(
                          /(<([^>]+)>)/gi,
                          ''
                        )}
                  </td>
                </tr>
                <tr>
                  <th>Color:</th>
                  <td>
                    {!speciesData['Color']
                      ? 'N/A'
                      : speciesData['Color'].replace(/(<([^>]+)>)/gi, '')}
                  </td>
                </tr>
                <tr>
                  <th>Taste:</th>
                  <td>
                    {!speciesData['Taste']
                      ? 'N/A'
                      : speciesData['Taste'].replace(/(<([^>]+)>)/gi, '')}
                  </td>
                </tr>
                <tr>
                  <th>Texture:</th>
                  <td>
                    {!speciesData['Texture']
                      ? 'N/A'
                      : speciesData['Texture'].replace(/(<([^>]+)>)/gi, '')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default SpeciesProfile;
