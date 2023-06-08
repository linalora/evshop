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
exports.burritoRouter = void 0;
const express_1 = __importDefault(require("express"));
const security_1 = require("../security");
const burrito_service_1 = require("../services/burrito.service");
const router = express_1.default.Router();
exports.burritoRouter = router;
router.get("/:id", security_1.authenticateAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const burrito = yield (0, burrito_service_1.findBurritoById)(req.params.id);
        res.status(200).json(burrito);
    }
    catch (err) {
        res.status(401).json({ message: err });
    }
}));
router.get("/", security_1.authenticateAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const burritos = (0, burrito_service_1.findBurritos)();
        res.status(200).json(burritos);
    }
    catch (err) {
        res.status(401).json({ success: false, message: err });
    }
}));
router.post("/", security_1.authenticateAPIKey, (req, res) => {
    try {
        const burrito = (0, burrito_service_1.createBurrito)(req.body);
        res.status(200).json(burrito);
    }
    catch (err) {
        res.status(401).json({ success: false, message: err });
    }
});
