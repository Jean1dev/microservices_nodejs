FROM node:8.11-alpine
LABEL key="gateway"

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ARG TIPO_AMBIENTE
ENV TIPO_AMBIENTE $TIPO_AMBIENTE

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV PORT 8080
EXPOSE $PORT
CMD [ "npm", "start" ]
