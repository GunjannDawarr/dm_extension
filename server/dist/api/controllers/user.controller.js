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
exports.setUserDetails = setUserDetails;
const logger_utils_1 = __importDefault(require("../../utils/logger.utils"));
const user_services_1 = require("../../services/user.services");
function setUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, name } = req.body;
            const user = yield (0, user_services_1.checkAndUpdateUser)(username, name);
            if (user) {
                logger_utils_1.default.info("User info updated!");
                res.status(200).json({ success: true, data: user });
            }
            ;
        }
        catch (e) {
            logger_utils_1.default.error(`Error updating user details: ${e}`);
        }
    });
}
