FROM node:lts

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install os updates and aws cli
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get install unzip -y && \
    curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install 

# Change dir to /backend
WORKDIR /backend

# Copy all necessary files to /app in the docker container during build time
COPY controllers /backend/controllers
COPY routes /backend/routes
COPY utils /backend/utils
COPY ["package*.json", "config.js", "server.js", "/backend/"]

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]
