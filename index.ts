import express, { Express, Request, Response } from "express";
import cors from "cors";
import db from "./model";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import bodyParser from "body-parser";

const app: Express = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Role = db.role;

app.get("/", (req, res) => {
	res.send("Hello World!, New");
});

function initial() {
	Role.create({
		id: 1,
		name: "user",
	});

	Role.create({
		id: 2,
		name: "moderator",
	});

	Role.create({
		id: 3,
		name: "admin",
	});
}

// routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
