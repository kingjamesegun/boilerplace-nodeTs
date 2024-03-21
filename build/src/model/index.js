"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../config/db.config");
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
const role_model_1 = require("./role.model");
const sequelize = new sequelize_1.Sequelize(db_config_1.config.DB, db_config_1.config.USER, db_config_1.config.PASSWORD, {
    host: db_config_1.config.HOST,
    dialect: db_config_1.config.dialect,
    pool: {
        max: db_config_1.config.pool.max,
        min: db_config_1.config.pool.min,
        acquire: db_config_1.config.pool.acquire,
        idle: db_config_1.config.pool.idle,
    },
});
const db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize,
    user: (0, user_model_1.UserModel)(sequelize),
    role: (0, role_model_1.RoleModel)(sequelize),
    ROLES: ["user", "admin", "moderator"],
};
const Role = db.role;
const User = db.user;
Role.belongsToMany(User, { through: "user_roles" });
User.belongsToMany(Role, { through: "user_roles" });
exports.default = db;
