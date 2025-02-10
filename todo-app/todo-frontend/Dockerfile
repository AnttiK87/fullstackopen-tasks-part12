FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY package*.json package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run test

FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app/ /usr/src/app/

RUN npm ci

ENV VITE_BACKEND_URL="http://localhost:8080/api/"

RUN npm run build

FROM nginx:1.20.1 as production

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]