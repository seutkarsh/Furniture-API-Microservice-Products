import { Request, Response, Router } from "express";
import { Container } from "typedi";
import { ResponseWrapper } from "../responses/responseWrapper";
import { ProductsService } from "../../services/ProductService/ProductsService";
import Logger from "../../loaders/logger";
import { IProductCreationDetails } from "../../services/ProductService/ProductsService";
import { IProductSchema } from "../../models/Schemas/productSchema";
import { Document } from "mongoose";

export default (router: Router): void => {
	const productService = Container.get(ProductsService);
	//get main products and categories
	router.get("/", async (req: Request, res: Response) => {
		const response = new ResponseWrapper();
		try {
			const data = await productService.getProducts();
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			// @ts-ignore
			response.setError(e.message);
		}
		res.json(response);
	});

	router.post("/create", async (req: Request, res: Response) => {
		try {
			const productFields: IProductCreationDetails = {
				name: req.body.name,
				description: req.body.description,
				type: req.body.type,
				unit: req.body.unit,
				price: req.body.price,
				available: req.body.available,
				supplier: req.body.supplier,
				banner: req.body.banner,
			};
			const data = await productService.createProduct(productFields);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	});

	router.get("/category/:type", async (req: Request, res: Response) => {
		try {
			const categoryType: string = req.params.type.toString();
			const data =
				await productService.getProductsByCategory(categoryType);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	});

	router.get("/detailPage/:id", async (req: Request, res: Response) => {
		try {
			const productId: string = req.params.id.toString();
			const product = productService.getDetailPageProduct(productId);
		} catch (e) {
			Logger.error(e);
			// @ts-ignore
			response.setError(e);
		}
	});
};
