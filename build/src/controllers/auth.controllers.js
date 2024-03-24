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
exports.signup = void 0;
const model_1 = __importDefault(require("../model"));
const auth_config_1 = require("../config/auth.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, roles } = req.body;
        const hashedPassword = bcryptjs_1.default.hashSync(password, 8);
        const user = yield model_1.default.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield model_1.default.user.create({ username, email, password: hashedPassword }, { transaction: t });
            if (roles) {
                const roleInstances = yield model_1.default.role.findAll({
                    where: {
                        name: {
                            [sequelize_1.Op.or]: roles,
                        },
                    },
                    transaction: t,
                });
                yield user.setRoles(roleInstances, { transaction: t });
            }
            else {
                yield user.setRoles([model_1.default.ROLES[0]], { transaction: t });
            }
            return user;
        }));
        res.status(200).send({ message: "User was registered successfully!" });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
exports.signup = signup;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, auth_config_1.authConfig.secret, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        });
        const authorities = [];
        const roles = yield user.getRoles();
        roles.forEach((role) => {
            authorities.push("ROLE_" + role.name.toUpperCase());
        });
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
const authController = {
    signUp,
    signIn,
};
exports.default = authController;
