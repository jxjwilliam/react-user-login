FROM node:latest

MAINTAINER William Jiang

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]

# docker build -t williamjxj/react-user-login .
# docker run --name react-user-login-container -p 3000:8000 -d williamjxj/react-user-login