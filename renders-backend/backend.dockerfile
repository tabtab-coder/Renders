# Base image
FROM node:14-alpine3.14 as build

WORKDIR /usr/src/app
COPY ./renders-backend/package*.json ./
RUN npm install
RUN rm -f ./node_modules/yjs/node_modules

# Bundle app source
COPY ./renders-backend .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000
# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]