FROM node:lts-alpine@sha256:f07ead757c93bc5e9e79978075217851d45a5d8e5c48eaf823e7f12d9bbc1d3c

#==============#
# PROVISIONING #
#==============#
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . /app

CMD npm run start:dev
EXPOSE 80