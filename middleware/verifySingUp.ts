import db from "../model";
import { Response, Request, NextFunction } from "express";
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameorEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const foundUsername = await User.findOne({
			where: { username: req.body.username },
		});

		if (foundUsername) {
			res.status(400).send({ message: "Failed! Username is already in use!" });
		}
		return;
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error", error });
	}

	// for email addresses
	try {
		const foundEmail = await User.findOne({
			where: { email: req.body.email },
		});

		if (foundEmail) {
			res.status(400).send({ message: "Failed! Email is already in use!" });
		}
		return;
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error", error });
	}
	next();
};

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLES.includes(req.body.roles[i])) {
				res.status(400).send({
					message: "Failed! Role does not exist = " + req.body.roles[i],
				});
				return;
			}
		}
	}

	next();
};

const verifySignUp = {
	checkDuplicateUsernameorEmail,
	checkRolesExisted,
};

export default verifySignUp;
