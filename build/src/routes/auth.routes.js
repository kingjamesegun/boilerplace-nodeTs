"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../middleware"));
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const verifySignUp = middleware_1.default.verifySignUp;
const router = express_1.default.Router();
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.post("/signup", verifySignUp.checkDuplicateUsernameorEmail, verifySignUp.checkRolesExisted, auth_controllers_1.default.signUp);
router.post("/signin", auth_controllers_1.default.signIn);
exports.default = router;
