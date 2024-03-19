"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../config/db.config");
const sequelize_1 = require("sequelize");
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
    sequelize: sequelize,
    Sequelize: sequelize_1.Sequelize,
    user: require("./user.model")(sequelize, sequelize_1.Sequelize),
    role: require("./role.model")(sequelize, sequelize_1.Sequelize),
    ROLES: ["user", "admin", "moderator"],
};
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});
exports.default = db;
