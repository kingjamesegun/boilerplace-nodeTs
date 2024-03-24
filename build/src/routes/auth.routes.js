"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const verifySignUp = middleware_1.default.verifySignUp;
exports.default = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/auth/signup", [
        (verifySignUp.checkDuplicateUsernameorEmail,
            verifySignUp.checkRolesExisted),
    ], auth_controllers_1.default.signUp);
    app.post("api/auth/signin", auth_controllers_1.default.signIn);
};
