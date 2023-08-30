import express, { Express } from "express";
import loaders from "./loaders";
import config from "./config/index";

async function startServer(): Promise<void> {
	const app: Express = express();
	await loaders(app);
	app.listen(config.port, () => {
		`Server Started At Port ${config.port}`;
	});
}

startServer()
	.then(() => {
		console.log("Server Started Succeccfully");
	})
	.catch((e) => {
		console.log(e.stack);
	});
