FROM node:9.2-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 1234

CMD npm start
