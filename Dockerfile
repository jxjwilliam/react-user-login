FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
ADD package.json /usr/src/app/package.json
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
