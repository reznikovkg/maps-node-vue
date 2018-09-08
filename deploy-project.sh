#!/bin/bash

docker exec -it maps-node-vue_web_1 node_modules/.bin/sequelize db:migrate
docker exec -it maps-node-vue_web_1 node_modules/.bin/sequelize db:seed:all

cd frontend

npm run dev
