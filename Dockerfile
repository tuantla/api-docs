FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY dist dist
COPY server server
COPY server.js server.js
EXPOSE 8080
CMD [ "node", "server.js" ]
