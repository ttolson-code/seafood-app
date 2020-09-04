#!/usr/bin/env bash

function installDependencies() {
    echo "Updating..."
    yum update -y
    echo "Update complete...Installing dependencies"
    yum install jq zip unzip curl python-pip -y >> /dev/null/
    curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    ./aws/install
    curl -o /usr/bin/ecs-cli "https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-linux-amd64-latest"
    chmod +x /usr/bin/ecs-cli
}

### Main ###

installDependencies