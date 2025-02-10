FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

USER root

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]