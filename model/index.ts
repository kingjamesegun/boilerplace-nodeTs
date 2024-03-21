import { config } from "../config/db.config";
import { Sequelize, DataTypes, Model } from "sequelize";
import { UserModel } from "./user.model";
import { RoleModel } from "./role.model";

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

interface Db {
	Sequelize: any; // Adjust the type as per your Sequelize setup
	sequelize: any; // Adjust the type as per your Sequelize setup
	user: any;
	role: any;
	ROLES: string[];
}

const db = {
	Sequelize,
	sequelize,
	user: UserModel(sequelize),
	role: RoleModel(sequelize),
	ROLES: ["user", "admin", "moderator"],
};

const Role = db.role;
const User = db.user;

Role.belongsToMany(User, { through: "user_roles" });
User.belongsToMany(Role, { through: "user_roles" });

export default db;
