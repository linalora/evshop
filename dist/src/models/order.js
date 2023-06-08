"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    quantity: { type: Number, default: 1, min: 1 },
    unit_price: { type: Number, required: true },
    description: { type: String },
    variant_id: { type: String },
});
const orderSchema = new mongoose_1.default.Schema({
    _id: { type: String },
    status: { type: String, default: "pending" },
    items: [orderItemSchema],
    total: { type: Number },
    createdAt: { type: Date, default: Date.now },
});
orderSchema.pre("save", function (next) {
    let total = 0;
    this.items.forEach((item) => (total += item.quantity * item.unit_price));
    this.total = total;
    next();
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.Order = Order;
