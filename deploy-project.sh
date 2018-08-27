#!/bin/bash

cd backend
npm install
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all

cd ../frontend
npm install
