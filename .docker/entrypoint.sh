#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

if [ ! -f "ormconfig.json" ]; then
  cp ormconfig.example ormconfig.json
fi

yarn install

yarn run typeorm -- -d src/shared/infra/typeorm/index.ts schema:drop

yarn run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run

yarn seed:run

yarn run dev
