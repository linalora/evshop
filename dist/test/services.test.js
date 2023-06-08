"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const burrito_service_1 = require("../src/services/burrito.service");
const order_service_1 = require("../src/services/order.service");
describe("burrito shop", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoUri = `${process.env.MONGO_URI}`;
        yield mongoose_1.default.connect(mongoUri);
        yield (0, order_service_1.deleteAllOrders)();
        yield (0, burrito_service_1.deleteAllBurritos)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe("Burrito", () => {
        it("it should create a new burrito with options", () => __awaiter(void 0, void 0, void 0, function* () {
            const variant1 = {
                _id: "b1_001",
                price: 4,
                size: "regular",
            };
            const burrito_payload = {
                _id: "b1",
                name: "Chicken Burrito",
                description: "The best burrito in town. Contains lettuce, olives and honey mustard",
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
            const new_burrito = yield (0, burrito_service_1.createBurrito)(burrito_payload);
            expect(new_burrito._id).toBe(burrito_payload._id);
            expect(new_burrito.name).toBe(burrito_payload.name);
            expect(new_burrito.description).toBe(burrito_payload.description);
            expect(new_burrito.options).toHaveLength(5);
        }));
        it("it should create a new burrito without options", () => __awaiter(void 0, void 0, void 0, function* () {
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
            const new_burrito = yield (0, burrito_service_1.createBurrito)(burrito_payload);
            expect(new_burrito._id).toEqual(burrito_payload._id);
            expect(new_burrito.name).toEqual(burrito_payload.name);
            expect(new_burrito.options).toHaveLength(0);
        }));
        it("It shouldn't create a duplicate burrito variant", () => __awaiter(void 0, void 0, void 0, function* () {
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
            yield expect((0, burrito_service_1.createBurrito)(burrito_payload)).rejects.toThrow(Error);
        }));
        it("it should create a new burrito variant", () => __awaiter(void 0, void 0, void 0, function* () {
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
            const new_burrito = yield (0, burrito_service_1.createBurrito)(burrito_payload);
            expect(new_burrito._id).toEqual(burrito_payload._id);
        }));
        it("it should retrieve a list of burritos", () => __awaiter(void 0, void 0, void 0, function* () {
            const burrito_list = yield (0, burrito_service_1.findBurritos)();
            expect(burrito_list).toHaveLength(3);
        }));
        it("it should find burrito variant", () => __awaiter(void 0, void 0, void 0, function* () {
            const burrito_variant = yield (0, burrito_service_1.findBurritoItem)("b2_001");
            expect(burrito_variant._id).toEqual("b2_001");
        }));
    });
    describe("Order", () => {
        it("it should create an order", () => __awaiter(void 0, void 0, void 0, function* () {
            const order_payload = [
                { burrito_variant_id: "b2_002", quantity: 1 },
                { burrito_variant_id: "b1_004", quantity: 1 },
                { burrito_variant_id: "b3_001", quantity: 2 }, //3
            ];
            const order = yield (0, order_service_1.createOrder)(order_payload);
            expect(order).toBeTruthy();
            expect(order.total).toEqual(13);
            expect(order.items).toHaveLength(order_payload.length);
        }));
        it("it should create a new order", () => __awaiter(void 0, void 0, void 0, function* () {
            const order_payload = [
                { burrito_variant_id: "b2_001", quantity: 5 }, //3 usd
            ];
            const order = yield (0, order_service_1.createOrder)(order_payload);
            expect(order).toBeTruthy();
            expect(order.total).toEqual(15);
            expect(order.items).toHaveLength(order_payload.length);
        }));
        it("it should retrieve a list of orders", () => __awaiter(void 0, void 0, void 0, function* () {
            const order_list = yield (0, order_service_1.findOrders)();
            expect(order_list).toHaveLength(2);
        }));
    });
});
