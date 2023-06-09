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

# Curl commands

- Get burrito list:

```
curl --location --request GET 'localhost:49160/api/burrito/' \
--header 'x-api-key: secret-shop23.'
```

- Get burrito by id:

```
curl --location --request GET 'localhost:49160/api/burrito/b1' \
--header 'x-api-key: secret-shop23.'
```

- Create order:

You need to set the `burrito_variant_id` with the desired `_id` value from the burrito's `variants` array
![image](https://github.com/linalora/evshop/assets/2327871/ea3f89c8-d092-4e4e-90eb-e213367f4eac)

```
curl --location --request POST 'localhost:49160/api/order/' \
--header 'x-api-key: secret-shop23.' \
--data-raw '[
    { "burrito_variant_id": "b2_002", "quantity": 1 },
    { "burrito_variant_id": "b1_004", "quantity": 2 }
]
'
```

- Get order list:

```
curl --location --request GET 'localhost:49160/api/order/' \
--header 'x-api-key: secret-shop23.' \
--data-raw ''
```

- Get order by id:

```
curl --location --request GET 'localhost:49160/api/order/9df620d4-0c0d-4b54-abe7-82a97c0cacc6' \
--header 'x-api-key: secret-shop23.' \
--data-raw ''
```
