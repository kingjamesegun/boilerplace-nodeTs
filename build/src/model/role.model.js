"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const sequelize_1 = require("sequelize");
const RoleModel = (sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
    return Role;
};
exports.RoleModel = RoleModel;
