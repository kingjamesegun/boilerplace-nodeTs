import { Request, Response, NextFunction } from "express";
import middleware from "../middleware";
import controller from "../controllers/auth.controllers";

const verifySignUp = middleware.verifySignUp;

export default (app) => {
	app.use((req: Request, res: Response, next: NextFunction) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post(
		"/api/auth/signup",
		[
			(verifySignUp.checkDuplicateUsernameorEmail,
			verifySignUp.checkRolesExisted),
		],
		controller.signUp
	);

	app.post("api/auth/signin", controller.signIn);
};
