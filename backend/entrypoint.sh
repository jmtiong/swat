#!/bin/sh
set -e
cd /usr/src/app

npx prisma generate
npx prisma migrate deploy

npm run start:prod
