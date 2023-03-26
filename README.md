# Bank Account Manager Demo

This is a demo project for managing bank users and accounts. It is built using the MERN stack, with a React front-end and an Express back-end.

## Installation

To install the project dependencies, run the following commands in both the `client` and `server` directories:

```
> npm install
```


## Usage

To start the development server for the client and server, run the following command in the project root directory:

```
npm run dev
```


This will start the React development server on port 3000 and the Express server on port 5000.

## Front-End

The front-end of the app is built using React and TypeScript. The main components of the front-end are:

- `App.tsx`: This is the root component of the app, which contains the main navigation and routing logic.
- `components`: This directory contains the individual components used to build the pages of the app.
- `pages`: This directory contains the pages of the app, which are made up of one or more components.

## Back-End

The back-end of the app is built using Express and MongoDB. The main components of the back-end are:

- `app.js`: This is the main Express application file, which contains the server configuration and routing logic.
- `models`: This directory contains the Mongoose models for the database collections.
- `routes`: This directory contains the Express route handlers for the API endpoints.
- `config`: This directory contains the configuration files for the database and server.

### `Backend repo link`
[Backend Repo](https://github.com/eladjmc/bank-backend-express)

## Database

The database for the app is MongoDB, which is hosted on the cloud MongoDB Atlas service. The Mongoose library is used to interact with the database. The database has two collections:

- `users`: This collection stores information about the bank users, such as name and email address.
- `accounts`: This collection stores information about the bank accounts, such as balance and account type.

### App demo link:

[Bank Manager](https://elad-bank-fullstack.netlify.app/)



