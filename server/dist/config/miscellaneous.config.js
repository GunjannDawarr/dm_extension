"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(env) {
    return {
        port: env.PORT,
        frontEndUrl: env.FRONTEND_URL || `http://localhost:5173`,
        groqApiKey: env.GROQ_API_KEY,
        redisUrl: env.UPSTASH_REDIS_REST_URL,
        redisToken: env.UPSTASH_REDIS_REST_TOKEN
    };
}
