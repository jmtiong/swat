# SWAT

## What is SWAT?
SWAT stands for Singapore Weather And Traffic.

# How to run?

## Docker Compose
1. Satisfy the prerequisites for Docker Compose https://docs.docker.com/compose/gettingstarted/
2. Install `docker-compose`
4. Run `docker-compose build`
3. Run `docker-compose up`

## Manual Running
Assuming that you have your postgres database running locally on port 5432
1. Go to `backend` folder
2. Install npm modules via `npm install`
3. Update the `DATABASE_URL` in your `.env` file
4. Run `npm run start`
5. Create another terminal and travel to `frontend` folder
6. Install npm modules via `npm install`
7. Run `npm run start`
8. Travel to `localhost:3001`

# Business Objective
Create a web application that allows users to list, filter and view the weather and traffic conditions given a specific time and date with location.

# Assumptions
1. All endpoints are publicly available without authentication/authorization.
2. Current information is only limited to Singapore.
3. The interval for weather update is every 5 minutes.
4. There is no need to handle race conditions.
5. Area name is unique and lat and long doesn't change.
6. List of cameras will not change. There are no additional or removal of cameras.
7. List of areas will not change. There are no additional or removal of areas.

# Functional Requirements
1. User is able to retrieve a list of locations given a date and time.
2. User is able to retrieve traffic imagery and weather conditions given a location.

# Non-Functional Requirements
These are some of the factors to consider during building of the project.

Both frontend and backend utilizes
Node Version: 18.16.1
NPM Version: 9.5.1

## Performance
## Scalability
## Usability
## Maintainability