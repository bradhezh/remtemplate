FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build
RUN npm prune --omit=dev

USER node

CMD npm start
