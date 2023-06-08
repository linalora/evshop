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
// Import the express in typescript file
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const burrito_1 = require("./routes/burrito");
const order_1 = require("./routes/order");
// Initialize the express engine
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(`/api/burrito`, burrito_1.burritoRouter);
app.use(`/api/order`, order_1.orderRouter);
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
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`${process.env.MONGO_URI}`);
    });
}
