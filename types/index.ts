import { Request } from "express";

export type Dialect = "postgres" | "mysql" | "sqlite" | "mssql"; // Add more dialects if needed

export type DatabaseConfig = {
	HOST: string;
	USER: string;
	PASSWORD: string;
	DB: string;
	dialect: Dialect | undefined;
	pool: {
		max: number;
		min: number;
		acquire: number;
		idle: number;
	};
};

export interface AuthenticatedRequest extends Request {
	userId?: string;
}
