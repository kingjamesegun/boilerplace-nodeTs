import express, { Express, Request, Response } from "express";
import cors from "cors";
import db from "./model";

const app: Express = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
const Role = db.role;

db.sequelize
	.sync({ force: true })
	.then(() => {
		console.log("Drop and Resync Db");
		initial();
	})
	.catch((err) => console.log({ err }));

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

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
