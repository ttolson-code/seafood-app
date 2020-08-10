FROM ubuntu:20.04

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
WORKDIR /app

# copy all necessary files to /app in the docker container during build time
COPY public /app/public
COPY src /app/src
COPY package.json /app/
COPY entrypoint.sh /app/

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "start"]
