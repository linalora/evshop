"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAPIKey = void 0;
const authenticateAPIKey = (req, res, next) => {
    const auth = req.header("x-api-key");
    if (auth !== process.env.API_KEY) {
        return res.status(401).send({ success: false, reason: "Invalid API Key" });
    }
    else {
        next();
    }
};
exports.authenticateAPIKey = authenticateAPIKey;
