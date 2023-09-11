import { Request, Response, Router } from "express";
import { Container } from "typedi";
import { APIError, ResponseWrapper } from "../responses/responseWrapper";
import { ProductsService } from "../../services/ProductsService";
import Logger from "../../loaders/logger";

export default (router: Router): void => {
	const productService = Container.get(ProductsService);
	//get main products and categories
	router.get("/", async (req: Request, res: Response) => {
		const response = new ResponseWrapper<Record<string, string>>();
		try {
			const data = await productService.getProducts();
			// response.setData(data);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
		res.json({ here: "here" });
	});
};
