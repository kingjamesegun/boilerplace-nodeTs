import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";
import db from "../model";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types";

const User = db.user;

const verifyToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({
			message: "No token available!",
		});
	}

	if (Array.isArray(token)) {
		token = token[0];
	}

	jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized" });
		}
		req.userId = decoded.id;
		next();
	});
};

const isAdmin = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findByPk(req.userId);
		if (!user) {
			return res.status(404).send({
				message: "User not found",
			});
		}
		const roles = await user.getRoles();

		let isAdmin = false;
		for (let i = 0; i < roles.length; i++) {
			if (roles[i].name === "admin") {
				isAdmin = true;
				break;
			}
		}

		if (isAdmin) {
			next();
		} else {
			res.status(403).send({
				message: "Require Admin Role!",
			});
		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error", error });
	}
};

const isModerator = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findByPk(req.userId);
		if (!user) {
			return res.status(404).send({
				message: "User not found",
			});
		}
		const roles = await user.getRoles();
		let isModerator = false;
		for (let i = 0; i < roles.length; i++) {
			if (roles[i].name === "moderator") {
				isModerator = true;
				break;
			}
		}
		if (isModerator) {
			next();
		} else {
			res.status(403).send({
				message: "Require Moderator Role!",
			});
		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error", error });
	}
};

const isModeratorOrAdmin = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findByPk(req.userId);
		if (!user) {
			return res.status(404).send({
				message: "User not found",
			});
		}
		const roles = await user.getRoles();
		let isModerator = false;
		let isAdmin = false;
		for (let i = 0; i < roles.length; i++) {
			if (roles[i].name === "moderator") {
				isModerator = true;
				break;
			}
			if (roles[i].name === "admin") {
				isAdmin = true;
				break;
			}
		}
		if (isModerator || isAdmin) {
			next();
		} else {
			res.status(403).send({
				message: "Require Moderator or Admin Role!",
			});
		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error", error });
	}
};

const authJwt = {
	verifyToken,
	isAdmin,
	isModerator,
	isModeratorOrAdmin,
};

export default authJwt;
