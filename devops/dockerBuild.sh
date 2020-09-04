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
    DEPLOYABLE_IMAGES=$(cat docker-compose-aws.yml | grep 'image: ' | cut -d':' -f 2 | tr -d '"')
    echo ${DEPLOYABLE_IMAGES}
}

### Main ###

# configureAwsCli
buildImages