# Seafood App

Live link: https://seafood-app.com

## Tech Stack

### Application

- Node.js
- Express.js
- MongoDB
- React

### Infrastructure

- Docker
- Terraform
- AWS Route 53
- AWS S3
- AWS Certificate Manager
- AWS Cloudfront
- AWS Application Load Balancer
- AWS Elastic Container Registry
- AWS Elastic Container Service
- AWS Fargate
- AWS VPC

## Features

**Fish Finder**

- Display available species, can be filterd by "all", "wild", "farmed".
- Search bar that allows searching across all species and displaying real-time dropdown list of results.
- Individual pages of each species displaying species data.

**News**

- Display seafood news.

## Data

All data used for this project is provided by fishwatch.gov

https://www.fishwatch.gov/developers ( Info )

https://www.fishwatch.gov/api/species ( api )

## Docker

Docker cannot traverse backwards so it must be in the root directory with everything that needs to be copied into the container. Containers are based on Ubuntu:20.04.

### Requirements

- Install docker
- Install docker-compose

To build the containers run the following command from the root directory which contains the file `docker-compose.yaml`.

```console
$ docker-compose -f docker-compose.yaml build
```

To run the containers for local development run the following command from the root directory which contains the file `docker-compose.yaml`

```console
$ docker-compose -f docker-compose.yaml up
```

## Devops

The `devops` directory contains files for automated deployment and development.

localExport.sh contains a `$DB_URL` and a `$DB_NAME` variable. If you do not wish to use docker-compose you can run the following command `source ./devops/localExport.sh`. This will export the variables to your bash env where they will be consumed by `backend/config.js`.

```console
  mongoDb: {
    mongoUrl: (process.env.DB_URL),
    dbName: (process.env.DB_NAME),
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  }
}
```
