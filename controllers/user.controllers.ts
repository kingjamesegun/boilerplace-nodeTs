import { Response, Request } from "express";

export const allAccess = (req: Request, res: Response) => {
	res.status(200).send("Public Content.");
};

export const userContent = (req: Request, res: Response) => {
	res.send(200).send("User content");
};
export const adminContent = (req: Request, res: Response) => {
	res.send(200).send("Admin content");
};
export const moderatorContent = (req: Request, res: Response) => {
	res.send(200).send("Moderator content");
};
