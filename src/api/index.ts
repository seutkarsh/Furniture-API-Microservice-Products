import { Router } from "express";
import login from "./routes/login";
export default (): Router => {
	const expressRouter = Router();

	//route groups
	login(expressRouter);
	return expressRouter;
};
