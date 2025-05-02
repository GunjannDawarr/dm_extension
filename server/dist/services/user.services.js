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
exports.checkAndUpdateUser = checkAndUpdateUser;
const client_1 = require("@prisma/client");
const logger_utils_1 = __importDefault(require("../utils/logger.utils"));
const prisma = new client_1.PrismaClient();
function checkAndUpdateUser(username, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findFirst({
                where: {
                    username
                },
            });
            if (!user) {
                return yield prisma.user.create({
                    data: {
                        username,
                        name
                    },
                });
            }
            else {
                return yield prisma.user.update({
                    where: {
                        username
                    },
                    data: {
                        name
                    },
                });
            }
        }
        catch (e) {
            logger_utils_1.default.error(`Error in user check and update service: ${e}`);
        }
    });
}
