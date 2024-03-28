import { Sequelize, DataTypes } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
	const User = sequelize.define("User", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return User;
};
