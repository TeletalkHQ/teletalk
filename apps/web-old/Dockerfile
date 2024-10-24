FROM node:16-alpine

WORKDIR /teletalk-client-web

RUN npm i -g serve

COPY package*.json ./

COPY .npmrc ./
RUN npm install

COPY .env ./
COPY jsconfig.json ./
COPY .eslint* ./

ENV NODE_ENV production

COPY src/ src/
COPY public/ public/

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]
