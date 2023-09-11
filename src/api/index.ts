import { Router } from "express";
import products from "./routes/products";
export default (): Router => {
	const expressRouter = Router();

	//route groups
	products(expressRouter);
	return expressRouter;
};
