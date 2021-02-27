#!/usr/bin/env bash
set -ex

function build() {

    # build and sync build to s3
    echo "Building react app..."
    npm install
    npm run build

    echo "Syncing build with s3..."
    aws s3 sync build/ s3://"${BUCKET}" 

}

###  Main ###

build
