FROM node:latest as builder


RUN mkdir /SERVICE
COPY . /SERVICE
COPY ["start.sh", "/start.sh"]



RUN chmod -R 777 /SERVICE

RUN chmod -R 777 /start.sh

WORKDIR /SERVICE

RUN yarn

RUN yarn build

EXPOSE 8001


ENTRYPOINT ["/start.sh"]


