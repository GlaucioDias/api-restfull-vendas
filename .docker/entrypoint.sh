#!/bin/bash

yarn install
yarn run typeorm migration:run
sleep 5s
yarn seed:run

yarn run dev
