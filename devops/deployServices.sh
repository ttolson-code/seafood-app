#!/usr/bin/env bash
set -ex

function configureAwsCli() {

    echo "Configuring AWS..."
    aws configure set aws_access_key_id ${ACCESS_KEY}
    aws configure set aws_secret_access_key ${SECRET_KEY}
    aws configure set default.region ${AWS_DEFAULT_REGION}
    aws configure set default.output json
}

function createService() {

  echo "Updating Seafood-App Service..."
  ecs-cli compose --project-name ${SERVICE} --file docker-compose-aws.yaml \
    --ecs-params ./devops/ecsParams.yml service up \
    --launch-type FARGATE --create-log-groups \
    --cluster ${CLUSTER_NAME} \
    --timeout 15 --target-group-arn ${TARGET_GROUP_ARN} \
    --container-name nginx-proxy --container-port 8081
}

###  Main ###

configureAwsCli
createService