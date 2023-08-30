import { Application, Request, Response } from "express";

export default (expressApp: Application): void => {
	expressApp.get("/health", (req: Request, res: Response) => {
		res.status(200).end();
	});

	expressApp.head("/health", (req: Request, res: Response) => {
		res.status(200).end();
	});
};
