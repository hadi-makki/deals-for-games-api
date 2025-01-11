#!/bin/bash
pm2 stop deals-for-games-api

git pull

yarn install

yarn build

pm2 save

pm2 start dist/src/main.js --name deals-for-games-api