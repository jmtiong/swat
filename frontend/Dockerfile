FROM node:18.16.1-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN pwd
RUN ls /usr/src/app

FROM nginx:1.17.1-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
