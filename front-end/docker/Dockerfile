FROM node:latest as builder

COPY ["SERVICE.tgz", "/SERVICE.tgz"]
COPY ["env", "/SERVICE/.env"]
COPY ["start.sh", "/start.sh"]

RUN tar -xzf SERVICE.tgz --directory /SERVICE && rm SERVICE.tgz

RUN chmod -R 777 /SERVICE

RUN chmod -R 777 /start.sh

WORKDIR /SERVICE

RUN yarn

RUN yarn build

EXPOSE 8000


ENTRYPOINT ["/start.sh"]


