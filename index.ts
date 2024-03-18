import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 5000;

app.get("/", (req, res) => {
	res.send("Hello World!, New");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
