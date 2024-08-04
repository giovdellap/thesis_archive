FROM node:14.16.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN rm -rf node_modules

RUN npm install


COPY . .
RUN npm install bcrypt
EXPOSE 8081
CMD [ "node", "index.js" ]
