"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_middleware_1 = require("../middlewares/cache.middleware");
const message_controller_1 = require("../controllers/message.controller");
const rateLimit_middleware_1 = require("../middlewares/rateLimit.middleware");
const router = (0, express_1.Router)();
router.post("/process", rateLimit_middleware_1.apiLimiter, cache_middleware_1.checkCache, message_controller_1.processMessages);
exports.default = router;
