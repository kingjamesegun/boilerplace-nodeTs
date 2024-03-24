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

export const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, password, roles } = req.body;

		const hashedPassword = bcrypt.hashSync(password, 8);

		const user = await db.sequelize.transaction(async (t) => {
			const user = await db.user.create(
				{ username, email, password: hashedPassword },
				{ transaction: t }
			);

			if (roles) {
				const roleInstances = await db.role.findAll({
					where: {
						name: {
							[Op.or]: roles,
						},
					},
					transaction: t,
				});
				await user.setRoles(roleInstances, { transaction: t });
			} else {
				await user.setRoles([db.ROLES[0]], { transaction: t });
			}

			return user;
		});

		res.status(200).send({ message: "User was registered successfully!" });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

const signIn = async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({
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
		roles.forEach((role) => {
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
		res.status(500).send({ message: err.message });
	}
};

const authController = {
	signUp,
	signIn,
};

export default authController;
