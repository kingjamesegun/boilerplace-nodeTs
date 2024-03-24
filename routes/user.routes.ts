import { Application, NextFunction, Request, Response } from "express";
import {
	allAccess,
	moderatorContent,
	userContent,
	adminContent,
} from "../controllers/user.controllers";
import authJwt from "../middleware/authjwt";

export const userRoutes = (app: Application) => {
	app.use((req: Request, res: Response, next: NextFunction) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/all", allAccess);
	app.get("/api/user", [authJwt.verifyToken], userContent);
	app.get(
		"/api/mod",
		[authJwt.verifyToken, authJwt.isModerator],
		moderatorContent
	);
	app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], adminContent);
};
