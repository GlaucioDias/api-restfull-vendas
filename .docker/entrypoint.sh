#!/bin/bash

yarn install
yarn run typeorm migration:run
sleep 10s
yarn run dev
