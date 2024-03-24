"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controllers_1 = require("../controllers/user.controllers");
const authjwt_1 = __importDefault(require("../middleware/authjwt"));
const userRoutes = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.get("/api/all", user_controllers_1.allAccess);
    app.get("/api/user", [authjwt_1.default.verifyToken], user_controllers_1.userContent);
    app.get("/api/mod", [authjwt_1.default.verifyToken, authjwt_1.default.isModerator], user_controllers_1.moderatorContent);
    app.get("/api/admin", [authjwt_1.default.verifyToken, authjwt_1.default.isAdmin], user_controllers_1.adminContent);
};
exports.userRoutes = userRoutes;
