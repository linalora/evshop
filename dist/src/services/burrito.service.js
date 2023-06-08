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
exports.findBurritoItem = exports.deleteAllBurritos = exports.findBurritos = exports.findBurritoById = exports.createBurrito = void 0;
const burrito_1 = require("../models/burrito");
function createBurrito(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input) {
            throw new Error("Please provide the burrito information");
        }
        return burrito_1.Burrito.create(input);
    });
}
exports.createBurrito = createBurrito;
function findBurritoById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return burrito_1.Burrito.find({ _id: id });
    });
}
exports.findBurritoById = findBurritoById;
function findBurritos() {
    return __awaiter(this, void 0, void 0, function* () {
        return burrito_1.Burrito.find({});
    });
}
exports.findBurritos = findBurritos;
function deleteAllBurritos() {
    return __awaiter(this, void 0, void 0, function* () {
        return burrito_1.Burrito.deleteMany({});
    });
}
exports.deleteAllBurritos = deleteAllBurritos;
function findBurritoItem(burrito_variant_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const burrito = (yield burrito_1.Burrito.findOne({
                "variants._id": burrito_variant_id,
            }));
            if (!burrito) {
                reject("Not found");
            }
            const item = burrito === null || burrito === void 0 ? void 0 : burrito.variants.find((variant) => variant._id == burrito_variant_id);
            if (!item) {
                reject("Not found");
            }
            resolve({
                _id: item._id,
                size: item.size,
                price: item.price,
                name: burrito.name,
            });
        }));
    });
}
exports.findBurritoItem = findBurritoItem;
