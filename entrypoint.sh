#!/bin/bash

# check if stage var is set on fargate task. if so, export ssm, else just run locally
if [ ${STAGE} ]; then
  echo "configuring aws..."
  $(aws configure set region us-east-1)
  echo "exporting ssm parameters..."
  $(aws ssm get-parameters-by-path --with-decryption --path /"${STAGE}"/seafood-app/backend \
    | jq -r '.Parameters| .[] | "export " + .Name + "=\"" + .Value + "\""  '  \
    | sed -e "s~/"${STAGE}"/seafood-app/backend/~~" | tr -d '"')
  echo "export complete"
els
  echo "running locally..."
fi

# perform an npm install before starting server
npm install

# exec is used to run the docker CMD after the entrypoint completes.
exec "$@"
