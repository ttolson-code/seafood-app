# Seafood App

## Backend
- node.js
- express
- mongoDB 

## Frontend 
- React


## Features

**Fish Finder**

Frontend 

- Display all available species, can be filterd by "all", "wild", "farmed".  
- Search bar that allows dynamically searching across all species and displaying real-time dropdown list of results. 
- Dynamic individual page loading of each species displaying species data. 

Backend

**News**

Frontend

Backend

## Data

All data used for this project is provided by fishwatch.gov 

https://www.fishwatch.gov/developers ( Info )

https://www.fishwatch.gov/api/species ( api ) 

## Dockerfile

Docker cannot traverse backwards so it must be in the root directory with everything that needs to be copied into the container. Container is based on Ubuntu:20.04. 

Manually build the container: ```shell
                              $ docker build -t seafood .
                              ```

```-t``` sets a tag so you can reference the docker image when running it.
