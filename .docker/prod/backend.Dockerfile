FROM node:alpine AS builder

WORKDIR /app

ADD lerna.json .
ADD package.json .

ADD packages/backend/package.json packages/backend/package.json

RUN yarn

ADD . .

RUN yarn build

CMD ["yarn", "workspace", "@wmg/backend", "start"]
