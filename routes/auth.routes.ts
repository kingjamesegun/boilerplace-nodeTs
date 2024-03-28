import express, { Router, Request, Response, NextFunction } from "express";
import middleware from "../middleware";
import controller from "../controllers/auth.controllers";

const verifySignUp = middleware.verifySignUp;
const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});

router.post(
	"/signup",

	verifySignUp.checkDuplicateUsernameorEmail,
	verifySignUp.checkRolesExisted,
	controller.signUp
);

router.post("/signin", controller.signIn);

export default router;
