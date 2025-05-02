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
exports.checkCache = checkCache;
exports.updateCache = updateCache;
const redis_1 = require("@upstash/redis");
const config_1 = require("../../config");
const logger_utils_1 = __importDefault(require("../../utils/logger.utils"));
const redis = new redis_1.Redis({
    url: config_1.miscConfig.redisUrl,
    token: config_1.miscConfig.redisToken,
});
function checkCache(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { username, priority, apiConfig } = req.body;
        try {
            if (priority !== "") {
                logger_utils_1.default.info(`Priority is set for user: ${username}`);
                next();
                return;
            }
            logger_utils_1.default.info(`Checking cache for user: ${username}`);
            const configCacheKey = `user:${username}:config`;
            const cachedConfig = yield redis.get(configCacheKey);
            const modelMatch = cachedConfig && cachedConfig.model === apiConfig.model;
            const providerMatch = cachedConfig && cachedConfig.provider === apiConfig.provider;
            console.log(cachedConfig, apiConfig, modelMatch, providerMatch);
            if (modelMatch && providerMatch) {
                // Config is the same, check message cache
                const messageCacheKey = `user:${username}:messages`;
                const cachedMessages = yield redis.get(username);
                if (((_a = cachedMessages === null || cachedMessages === void 0 ? void 0 : cachedMessages.tags) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    logger_utils_1.default.info(`Cache hit for user: ${username} with config: ${JSON.stringify(apiConfig)}`);
                    res.json(cachedMessages);
                    return;
                }
            }
            else {
                // Config has changed or no config in cache
                logger_utils_1.default.info(`Config change detected or no previous config. Updating config cache for user: ${username}`);
                yield redis.set(configCacheKey, { model: apiConfig.model, provider: apiConfig.provider }, { ex: 3600 }); // Cache config for 1 hour
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
function updateCache(username, apiConfig, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageCacheKey = `user:${username}:messages`;
        yield redis.set(messageCacheKey, data, { ex: 600 }); // Cache messages for 10 minutes
        logger_utils_1.default.info(`Updated message cache for user: ${username} with config: ${JSON.stringify(apiConfig)}`);
    });
}
