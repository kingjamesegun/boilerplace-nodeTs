"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const authjwt_1 = __importDefault(require("../middleware/authjwt"));
const router = express_1.default.Router();
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.get("/all", user_controllers_1.allAccess);
router.get("/user", [authjwt_1.default.verifyToken], user_controllers_1.userContent);
router.get("/api/mod", [authjwt_1.default.verifyToken, authjwt_1.default.isModerator], user_controllers_1.moderatorContent);
router.get("/api/admin", [authjwt_1.default.verifyToken, authjwt_1.default.isAdmin], user_controllers_1.adminContent);
exports.default = router;
