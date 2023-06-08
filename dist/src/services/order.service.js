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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllOrders = exports.findOrders = exports.findOrderById = exports.createOrder = void 0;
const uuid_1 = require("uuid");
const order_1 = require("../models/order");
const burrito_service_1 = require("./burrito.service");
function createOrder(items) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!items.length) {
            throw new Error("Please provide the order items");
        }
        const itemsVariantInfo = yield Promise.all(items === null || items === void 0 ? void 0 : items.map((item) => __awaiter(this, void 0, void 0, function* () { return (0, burrito_service_1.findBurritoItem)(item.burrito_variant_id); })));
        const orderItems = items.map((item) => {
            const variant = itemsVariantInfo.find((v) => v._id == item.burrito_variant_id);
            return {
                quantity: item.quantity,
                unit_price: variant.price,
                description: `${variant.name} - ${variant.size}`,
                variant_id: item.burrito_variant_id,
            };
        });
        const order = new order_1.Order({ _id: (0, uuid_1.v4)(), items: orderItems });
        return order.save();
    });
}
exports.createOrder = createOrder;
function findOrderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return order_1.Order.find({ _id: id });
    });
}
exports.findOrderById = findOrderById;
function findOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        return order_1.Order.find({});
    });
}
exports.findOrders = findOrders;
function deleteAllOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        return order_1.Order.deleteMany({});
    });
}
exports.deleteAllOrders = deleteAllOrders;
