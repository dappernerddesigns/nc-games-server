# DapperNerdDesigns NC Games API

## Project Summary

During the Back end module of the Northcoders bootcamp we each built an API for the purpose of accessing application data programmatically. The intention here is to mimick the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

The database and subsequent tables were built using Postgres. The data is accessed and presented using node-postgres.

Once complete the data has been pushed and hosted on heroku as a live and interactive app. All available endpoints are shown on the link below.

### Hosted version available:

https://dapper-nerd-designs-nc-games.onrender.com/api/

---

## How to install locally

If you wish to view this public repo locally on your own machine, you are welcome to fork and clone the project.

---

## Minimum requirements

Node.js 16.10.0 or later

PostgreSQL 12.9 or later

---

Several packages have been installed to make this repo work. These have already been added to the package.json. In order to install them on your machine simply type npm install in the terminal.

For your information, the used npm packages are:

-   dotenv
-   express
-   pg
-   pg-format

_For testing_

-   jest
-   jest-sorted
-   supertest

In order to fully run the files create the following two files in the route folder:

-   .env.test
-   .env.dev

These files will define the PGDATABASE file and whether the test or development data is being seeded. Inside each file type PGDATABASE=[type appropriate database name here] The names of the test and development databases are available in the setup.sql file.

These files are not included in the repo, if they are not created there will be an error in the terminal that the PGDATABASE is not set.

## Setting up the database

Some scripts have been added to the package.json to make setting up the database easier. In the terminal run the following scripts in order.

-   npm run setup-dbs

_This will drop the created database and then create a new and empty database_

-   npm run seed

_This will run the seed function to create tables and insert development data into the created tables_

To run the tests written for the created endpoints run:

-   npm test

The test script will reseed the database with test data and use the .env.test file to swap the PGDATABASE environment variable.

## Available /api/ endpoints

These are described in the endpoints.json or at https://dappernerddesigns-nc-games.herokuapp.com/api

The PATCH, POST and DELETE requests can be run from the test files. Currently not available on the hosted version as more front end development is required.
