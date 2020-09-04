#!/usr/bin/env bash

function configureAwsCli() {
    echo "Configuring AWS..."
    aws configure set aws_access_key_id ${ACCESS_KEY}
    aws configure set aws_secret_access_key ${SECRET_KEY}
    aws configure set default.region $AWS_DEFAULT_REGION
    aws configure set default.output json
    ECR_LOGIN="$(aws ecr get-login --no-include-email)"
    ${ECR_LOGIN}
}

function buildImages() {
    REPOSITORY_NAME=$(cat docker-compose-aws.yml | grep 'container_name: ' | cut -d':' -f 2)
    for REPOS in ${REPOSITORY_NAME}
    do
        IMAGE_DIR=$(cat docker-compose-aws.yml | grep 'context: ' | cut -d':' -f 2)
        docker build -t ${REPOS}:${TAG} -t ${REPOS}:latest ${IMAGE_DIR}/
    done
    docker image ls
}

### Main ###

#Ensure CI/CD variables are set otherwise exit
# if [[ -z "${AWS_REGION}" ]]; then
#   echo "AWS_REGION is empty"
#   exit 1
# fi
# if [[ -z "${ACCESS_KEY}" ]]; then
#   echo "ACCESS_KEY is empty"
#   exit 1
# fi
# if [[ -z "${SECRET_KEY}" ]]; then
#   echo "SECRET_KEY is empty"
#   exit 1
# fi

# export environment variables 
echo 'export TAG=$(echo ${CIRCLE_SHA1} | head -c 8)' >> $BASH_ENV
echo 'export DATE=$(date '+%Y-%m-%d')' >> $BASH_ENV
source $BASH_ENV

# configureAwsCli
# buildImages