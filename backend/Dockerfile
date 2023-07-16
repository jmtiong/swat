FROM node:18.16.1-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN mkdir -p /usr/src/app/dist
RUN npm run build

EXPOSE 3000

COPY entrypoint.sh /usr/src/app/entrypoint.sh

RUN chown -R 1000:1000 /usr/src/app/entrypoint.sh && chmod -R 777 /usr/src/app/entrypoint.sh
WORKDIR /usr/src/app
ENV DATABASE_URL="postgresql://myuser:mypassword@127.0.0.1:5432/mydb?schema=public"
ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]
CMD []