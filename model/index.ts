import { config } from "../config/db.config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
});

const db = {
	sequelize: sequelize,
	Sequelize: Sequelize,
	user: require("./user.model")(sequelize, Sequelize),
	role: require("./role.model")(sequelize, Sequelize),
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

export default db;
