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
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const security_1 = require("../security");
const order_service_1 = require("../services/order.service");
const router = express_1.default.Router();
exports.orderRouter = router;
router.get("/:id", security_1.authenticateAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, order_service_1.findOrderById)(req.params.id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(401).json({ message: err });
    }
}));
router.get("/", security_1.authenticateAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_service_1.findOrders)();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(401).json({ message: err });
    }
}));
router.post("/", security_1.authenticateAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, order_service_1.createOrder)(req.body);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(401).json({ message: err });
    }
}));
