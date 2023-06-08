"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Burrito = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const burritoVariantSchema = new mongoose_1.default.Schema({
    _id: { type: String, unique: true },
    size: String,
    price: Number,
});
const burritoSchema = new mongoose_1.default.Schema({
    _id: { type: String },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    variants: [burritoVariantSchema],
    options: [String],
});
const Burrito = mongoose_1.default.model("Burrito", burritoSchema);
exports.Burrito = Burrito;
