FROM node:18

ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG EMAIL_REPLY_TO
ARG EMAIL_FROM

ENV AWS_ACCESS_KEY=$AWS_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION
ENV EMAIL_REPLY_TO=$EMAIL_REPLY_TO
ENV EMAIL_FROM=$EMAIL_FROM

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "npm", "run", "start" ]
