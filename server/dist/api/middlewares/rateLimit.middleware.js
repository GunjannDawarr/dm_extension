"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_utils_1 = __importDefault(require("../../utils/logger.utils"));
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again after 1 minute',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.body.username,
    handler: (req, res) => {
        logger_utils_1.default.warn(`Rate limit exceeded for user: ${req.body.username}`);
        res.status(429).json({ error: 'Too Many Requests. Please try again after a minute!' });
    },
});
