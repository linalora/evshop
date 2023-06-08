# Burrito shop

Backend set of APIs to support your burrito shop's point of sales and ordering system.

This project uses Node.js with Typescript and a MongoDB database

### Environment variables

- MONGO_URI: connection string to the database
- API_KEY: the secret key to be included as `x-api-key` Header
- PORT: defaults to 3000

## Available endpoints

The following endpoints should return a JSON response:

- /api/burrito (list of burritos)
- /api/orders - a list of orders
- /api/orders/id - details of an individual order

# Commands

Run `npm install` to install the project dependencies
Run `npm test` start

Start the app in dev mode with hot reloading

```
npm run dev
```

Build and Start the compiled JS

```
npm run start
```

Run the unit tests

```
npm run test
```
