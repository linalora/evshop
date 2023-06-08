// Import the express in typescript file
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import { burritoRouter } from "./routes/burrito";
import { orderRouter } from "./routes/order";
// Initialize the express engine
const app: express.Application = express();

app.use(express.json());

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(`/api/burrito`, burritoRouter);
app.use(`/api/order`, orderRouter);

app.get("/", (_req, _res) => {
  _res.send("Use the /api endpoint");
});

// Server setup
app.listen(port, () => {
  console.log(`
         http://localhost:${port}/`);
});

connectDB()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

async function connectDB() {
  await mongoose.connect(`${process.env.MONGO_URI}`);
}
