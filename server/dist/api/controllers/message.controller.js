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
exports.processMessages = processMessages;
const logger_utils_1 = __importDefault(require("../../utils/logger.utils"));
const groq_service_1 = require("../../services/groq.service");
function processMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, messages, priority, apiConfig } = req.body;
            if (!messages || !Array.isArray(messages)) {
                res.status(400).json({ error: "Invalid request format. 'messages' must be an array." });
            }
            const result = yield (0, groq_service_1.categorizeLinkedInMessages)(messages, priority, username, apiConfig);
            if (result.error) {
                logger_utils_1.default.error(`API Error: ${result.error.status} - ${result.error.message}`);
                res.status(result.error.status).json({ error: result.error.message });
            }
            else {
                logger_utils_1.default.info(`Returning data ${result}`);
                res.json(result);
            }
        }
        catch (e) {
            logger_utils_1.default.error(`Error processing messages: ${e}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
