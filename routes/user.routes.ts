import express, {
	Application,
	NextFunction,
	Request,
	Response,
	Router,
} from "express";
import {
	allAccess,
	moderatorContent,
	userContent,
	adminContent,
} from "../controllers/user.controllers";
import authJwt from "../middleware/authjwt";
const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});

router.get("/all", allAccess);
router.get("/user", [authJwt.verifyToken], userContent);
router.get(
	"/api/mod",
	[authJwt.verifyToken, authJwt.isModerator],
	moderatorContent
);
router.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], adminContent);

export default router;
