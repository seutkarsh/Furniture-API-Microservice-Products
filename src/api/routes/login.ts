import { Request, Response, Router } from "express";
import Logger from "../../loaders/logger";

export default (router: Router) => {
	router.get("/onlogin", (req: Request, res: Response) => {
		res.status(200).send("On Login Call Response").end();
	});
};
