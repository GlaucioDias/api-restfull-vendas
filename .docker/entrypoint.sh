#!/bin/bash

yarn install
DROP SCHEMA public CASCADE
CREATE SCHEMA public

yarn run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run
sleep 5s
yarn seed:run

yarn run dev
