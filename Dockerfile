FROM node:8.11.3

WORKDIR /usr/src/app

COPY package.json ./

ADD package.json /usr/src/app/package.json

RUN npm install


COPY . .


EXPOSE 3000

CMP["npm", "start"]
