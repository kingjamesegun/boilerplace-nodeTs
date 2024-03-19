"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const UserModel = (sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
    return User;
};
exports.UserModel = UserModel;
