import { Request, Response } from "express";
import db from "../model";
import { authConfig } from "../config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

interface Db {
	sequelize: any;
	user: any;
	role: any;
	ROLES: string[];
}

export const signUp = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;

		const hashedPassword = await bcrypt.hashSync(password, 8);

		const user = await db.user.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(201).send({ message: "User was registered successfully!" });
	} catch (err) {
		res.status(500).send({ message: err });
	}
};

const signIn = async (req: Request, res: Response) => {
	try {
		const user = await db.user.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!user) {
			return res.status(404).send({ message: "User Not found." });
		}

		const passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!",
			});
		}

		const token = jwt.sign({ id: user.id }, authConfig.secret, {
			algorithm: "HS256",
			allowInsecureKeySizes: true,
			expiresIn: 86400, // 24 hours
		});

		const authorities: string[] = [];
		const roles = await user.getRoles();
		roles.forEach((role: any) => {
			authorities.push("ROLE_" + role.name.toUpperCase());
		});

		res.status(200).send({
			id: user.id,
			username: user.username,
			email: user.email,
			roles: authorities,
			accessToken: token,
		});
	} catch (err) {
		res.status(500).send({ message: err });
	}
};

const authController = {
	signUp,
	signIn,
};

export default authController;
