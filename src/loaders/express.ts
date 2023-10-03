import { Application, Request, Response } from "express";
import Router from "../api/index";

export default (expressApp: Application): void => {
	expressApp.get("/whoAmI", (req: Request, res: Response) => {
		res.send("Furniture API - Products").status(200).end();
	});

	expressApp.head("/whoAmI", (req: Request, res: Response) => {
		res.status(200).end();
	});

	expressApp.get("/health", (req: Request, res: Response) => {
		res.send("Healthy").status(200).end();
	});

	expressApp.head("/health", (req: Request, res: Response) => {
		res.status(200).end();
	});

	//Router Group
	expressApp.use(Router());
};
