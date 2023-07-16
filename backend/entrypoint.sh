#!/bin/sh
set -e
cd /usr/src/app

npx prisma generate

npm run start:prod
