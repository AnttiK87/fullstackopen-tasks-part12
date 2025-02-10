FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .
COPY package*.json ./

RUN npm ci --omit=dev

ENV DEBUG=test:*

USER node

CMD npm start