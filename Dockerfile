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

COPY backend .
COPY frontend .
COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "start" ]
