#!/bin/bash

yarn install
yarn run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run
//sleep 5s
//yarn seed:run

yarn run dev
