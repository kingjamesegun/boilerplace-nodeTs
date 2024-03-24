"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authjwt_1 = __importDefault(require("./authjwt"));
const verifySingUp_1 = __importDefault(require("./verifySingUp"));
const middleware = { authJwt: authjwt_1.default, verifySignUp: verifySingUp_1.default };
exports.default = middleware;
