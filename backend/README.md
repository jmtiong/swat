<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Things that we know

### Weather API
- if date is provided, it will return a list of all timings from 00:00 to end of date
- if date and timing is provided, it will return a list of 1 item containing that range
- if no parameters are provided, it will return a list of 1 item containing that range
- if both parameters are provided, it will take the date_time effect

#### Updating Weather Information Logic (Cron)
1. If the last updated timestamp is more than 5 minutes from now, request from API.
2. If time range has already passed validTo time, mark it as archived and update it one last time.
3. If requesting old date time range and it already exists, do not call API.

#### Weather External API
1. If no weather information of the area exists, call API.
2. If there exists a weather information but it is outdated, use as it is.

We can use Redis to cache similar requests within a short time frame.

### Traffic API
- if md5 hash did not change, no new image.

#### Updating Traffic Information Logic (utilize Cron)
1. To call the API every 60 seconds.
2. List return camera Id and same hash, archive record.
3. Same Camera Id and Different Hash, create a new record

Scenario 1: Camera ID and Different Hash = create new record
Scenario 2: Camera ID and Same Hash = mark record as archived
Scenario 3: Camera ID, different hash on 1st iteration. Same Camera ID, different hash on 2nd iteration = create new record.
Scenario 4: No such camera ID = create new camera ID, and tag closest area. Create new record.

#### Traffic External API
1. If there are no traffic information exists, call API.
2. If capture is archived, use as it is.

Scenario 1: No capture exists = call API
Scenario 2: capture exists, captured time > 20 seconds and capture is not archived = call API, if same camera id and same hash, archived. if same camera id and different hash, archived last capture and create new record.
Scenario 3: capture exists, captured time < 20 seconds = use as it is.


We can use Redis to cache requests for similar time frame.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
