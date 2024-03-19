import { Sequelize, DataTypes } from "sequelize";

export const RoleModel = (sequelize: Sequelize) => {
	const Role = sequelize.define("roles", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
	});

	return Role;
};
