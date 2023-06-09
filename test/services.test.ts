import "dotenv/config";
import mongoose from "mongoose";
import { IBurrito, IBurritoVariant } from "../src/models/burrito";
import { IOrderItemInput } from "../src/models/order";

import {
  createBurrito,
  deleteAllBurritos,
  findBurritoItem,
  findBurritos,
} from "../src/services/burrito.service";
import {
  createOrder,
  deleteAllOrders,
  findOrders,
} from "../src/services/order.service";

describe("burrito shop", () => {
  beforeAll(async () => {
    const mongoUri = `${process.env.MONGO_URI}`;
    await mongoose.connect(mongoUri);
    await deleteAllOrders();
    await deleteAllBurritos();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("Burrito", () => {
    it("it should create a new burrito with options", async () => {
      const variant1: IBurritoVariant = {
        _id: "b1_001",
        price: 4,
        size: "regular",
      };
      const burrito_payload: IBurrito = {
        _id: "b1",
        name: "Chicken Burrito",
        description:
          "The best burrito in town. Contains lettuce, olives and honey mustard",
        variants: [
          variant1,
          {
            _id: "b1_002",
            price: 3,
            size: "small",
          },
          { _id: "b1_003", price: 6, size: "XL" },
          { _id: "b1_004", price: 1, size: "XS" },
          { _id: "b1_005", price: 5, size: "Large" },
        ],
        options: [
          "no pepper",
          "no onions",
          "tomato",
          "sour cream",
          "black olives",
        ],
      };
      const new_burrito = await createBurrito(burrito_payload);
      expect(new_burrito._id).toBe(burrito_payload._id);
      expect(new_burrito.name).toBe(burrito_payload.name);
      expect(new_burrito.description).toBe(burrito_payload.description);
      expect(new_burrito.options).toHaveLength(5);
    });
    it("it should create a new burrito without options", async () => {
      const burrito_payload = {
        _id: "b2",
        name: "Roastbeef Burrito",
        description: "With pico de gallo and spicy salsa",
        variants: [
          {
            _id: "b2_001",
            price: 3,
            size: "small",
          },
          { _id: "b2_002", price: 6, size: "XL" },
          { _id: "b2_003", price: 1, size: "XS" },
          { _id: "b2_005", price: 5, size: "Large" },
        ],
      };
      const new_burrito = await createBurrito(burrito_payload);

      expect(new_burrito._id).toEqual(burrito_payload._id);
      expect(new_burrito.name).toEqual(burrito_payload.name);
      expect(new_burrito.options).toHaveLength(0);
    });

    it("It shouldn't create a duplicate burrito variant", async () => {
      const burrito_payload = {
        _id: "b3",
        name: "Veggie Burrito",
        description: "All the vevegetables",
        variants: [
          {
            _id: "b2_001",
            price: 4,
            size: "regular",
          },
        ],
      };
      await expect(createBurrito(burrito_payload)).rejects.toThrow(Error);
    });
    it("it should create a new burrito variant", async () => {
      const burrito_payload = {
        _id: "b3",
        name: "Veggie Burrito",
        description: "Not just lettuce and carrots",
        variants: [
          {
            _id: "b3_001",
            price: 3,
            size: "regular",
          },
        ],
      };
      const new_burrito = await createBurrito(burrito_payload);

      expect(new_burrito._id).toEqual(burrito_payload._id);
    });
    it("it should retrieve a list of burritos", async () => {
      const burrito_list = await findBurritos();
      expect(burrito_list).toHaveLength(3);
    });
    it("it should find burrito variant", async () => {
      const burrito_variant = await findBurritoItem("b2_001");
      expect(burrito_variant._id).toEqual("b2_001");
    });
  });
  describe("Order", () => {
    it("it should create an order", async () => {
      const order_payload: IOrderItemInput[] = [
        { burrito_variant_id: "b2_002", quantity: 1 }, //6
        { burrito_variant_id: "b1_004", quantity: 1 }, //1
        { burrito_variant_id: "b3_001", quantity: 2 }, //3
      ];

      const order = await createOrder(order_payload);
      expect(order).toBeTruthy();
      expect(order.total).toEqual(13);
      expect(order.items).toHaveLength(order_payload.length);
    });
    it("it should create a new order", async () => {
      const order_payload: IOrderItemInput[] = [
        { burrito_variant_id: "b2_001", quantity: 5 }, //3 usd
      ];

      const order = await createOrder(order_payload);
      expect(order).toBeTruthy();
      expect(order.total).toEqual(15);
      expect(order.items).toHaveLength(order_payload.length);
    });

    it("it should retrieve a list of orders", async () => {
      const order_list = await findOrders();
      expect(order_list).toHaveLength(2);
    });
  });
});
