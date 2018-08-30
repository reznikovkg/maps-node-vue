FROM node:latest

WORKDIR /var/www/backend
COPY . ./

RUN apt-get -y update
RUN npm install

EXPOSE 8888

#RUN node_modules/.bin/sequelize db:migrate
#RUN node_modules/.bin/sequelize db:seed:all

