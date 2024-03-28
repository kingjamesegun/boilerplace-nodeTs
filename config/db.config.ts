import { DatabaseConfig } from "../types";

export const config: DatabaseConfig = {
	HOST: "127.0.0.1",
	USER: "postgres",
	PASSWORD: "1234",
	DB: "testdb",
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
