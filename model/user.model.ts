import { Sequelize, DataTypes } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
	const User = sequelize.define("users", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
	});

	return User;
};
