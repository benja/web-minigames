FROM node:alpine AS builder

WORKDIR /app

ADD . .

RUN yarn

RUN yarn build

CMD ["yarn", "workspace", "@wmg/backend", "start"]
