import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World!, New");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
