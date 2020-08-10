FROM ubuntu:20.04

ENV NODE_PATH="/backend/node_modules/"
ENV NODE_OPTIONS="--max-old-space-size=4096"

# install dependencies
RUN apt-get update && \
    apt-get install curl -y && \
    apt-get install unzip -y && \
    curl -sL https://deb.nodesource.com/setup_14.x && \
    apt-get install nodejs -y && \
    apt-get install npm -y && \
    curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

# change dir to /app
WORKDIR /backend

# copy all necessary files to /app in the docker container during build time
COPY controller /backend/controller
COPY helpers /backend/helpers
COPY package*.json /backend/
COPY config.js /backend/
COPY server.js /backend/
COPY entrypoint.sh /backend/

RUN npm install

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "dev"]
