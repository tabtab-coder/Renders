FROM node:14-alpine3.14 as build
WORKDIR /app
ENV NODE_ENV=production
ENV PATH /app/node_modules/.bin:$PATH
COPY ./renders/package.json ./app
COPY ./renders/package-lock.json ./app
RUN npm install
COPY ./renders ./
RUN npm run build:prod

# Serve these static files with NGINX.
FROM nginx:1.21.6-alpine
COPY --from=build /app/dist/renders /usr/share/nginx/html
COPY ./renders/nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]