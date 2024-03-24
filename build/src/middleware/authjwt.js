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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
const model_1 = __importDefault(require("../model"));
const User = model_1.default.user;
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token available!",
        });
    }
    if (Array.isArray(token)) {
        token = token[0];
    }
    jsonwebtoken_1.default.verify(token, auth_config_1.authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.userId = decoded.id;
        next();
    });
};
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        const roles = yield user.getRoles();
        let isAdmin = false;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                isAdmin = true;
                break;
            }
        }
        if (isAdmin) {
            next();
        }
        else {
            res.status(403).send({
                message: "Require Admin Role!",
            });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
});
const isModerator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        const roles = yield user.getRoles();
        let isModerator = false;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                isModerator = true;
                break;
            }
        }
        if (isModerator) {
            next();
        }
        else {
            res.status(403).send({
                message: "Require Moderator Role!",
            });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
});
const isModeratorOrAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        const roles = yield user.getRoles();
        let isModerator = false;
        let isAdmin = false;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                isModerator = true;
                break;
            }
            if (roles[i].name === "admin") {
                isAdmin = true;
                break;
            }
        }
        if (isModerator || isAdmin) {
            next();
        }
        else {
            res.status(403).send({
                message: "Require Moderator or Admin Role!",
            });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
});
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin,
};
exports.default = authJwt;
