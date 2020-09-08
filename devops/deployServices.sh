#!/usr/bin/env bash
set -ex

function createService() {

  ecs-cli compose --project-name ${SERVICE} --file docker-compose-aws.yml \
    --ecs-params deploy-scripts/ecsParams.yml --task-role-arn ${TASK_ROLE_NAME} service up \
    --launch-type FARGATE --create-log-groups \
    --cluster ${CLUSTER_NAME} \
    --timeout 15 --target-group-arn ${TARGET_GROUP_ARN} \
    --container-name dashboard --container-port 8000
}

###  Main ###

createService