#!/bin/bash

# perform an npm install before starting server
npm install node-fetch -g

# node helpers/fetchSpeciesData.js

# exec is used to run the docker CMD after the entrypoint completes.
exec "$@"
