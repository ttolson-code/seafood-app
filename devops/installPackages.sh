#!/usr/bin/env bash

function installDependencies() {
    echo "Installing Dependencies..."
    yum update -y
    yum install jq zip unzip curl python-pip -y
    curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    ./aws/install
    curl -o /usr/bin/ecs-cli "https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-linux-amd64-latest"
    chmod +x /usr/bin/ecs-cli
    echo "Installing amazon linux extras..."
    amazon-linux-extras install docker -y
    curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
}

### Main ###

installDependencies