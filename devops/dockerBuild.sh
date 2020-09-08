#!/usr/bin/env bash

function configureAwsCli() {

    echo "Configuring AWS..."
    aws configure set aws_access_key_id ${ACCESS_KEY}
    aws configure set aws_secret_access_key ${SECRET_KEY}
    aws configure set default.region ${AWS_DEFAULT_REGION}
    aws configure set default.output json
    aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin 120545966579.dkr.ecr.us-east-1.amazonaws.com
}

function buildImages() {
    docker-compose -f docker-compose-aws.yml build

    IMAGES=("express-server" "seafood-app" "nginx-proxy" "mongo-db")

    for IMAGE in ${IMAGES[*]}; do
        docker tag "${IMAGE}" "${ECR_URI}/${IMAGE}"
        docker push "${ECR_URI}/${IMAGE}"
    done
}

### Main ###

#Ensure CI/CD variables are set otherwise exit
if [[ -z "${AWS_DEFAULT_REGION}" ]]; then
  echo "AWS_REGION is empty"
  exit 1
fi
if [[ -z "${ACCESS_KEY}" ]]; then
  echo "ACCESS_KEY is empty"
  exit 1
fi
if [[ -z "${SECRET_KEY}" ]]; then
  echo "SECRET_KEY is empty"
  exit 1
fi

# export environment variables 
# echo 'export TAG=$(echo ${CIRCLE_SHA1} | head -c 8)' >> $BASH_ENV
# echo 'export DATE=$(date '+%Y-%m-%d')' >> $BASH_ENV
# source $BASH_ENV

configureAwsCli
buildImages