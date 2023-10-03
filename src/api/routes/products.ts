import { Request, Response, Router } from "express";
import { Container } from "typedi";
import { ResponseWrapper } from "../responses/responseWrapper";
import {
	DetailPageProduct,
	Product,
	ProductsService,
} from "../../services/ProductService/ProductsService";
import Logger from "../../loaders/logger";
import { IProductCreationDetails } from "../../services/ProductService/ProductsService";

export default (router: Router): void => {
	const productService = Container.get(ProductsService);
	//get main products and categories
	router.get("/", async (req: Request, res: Response) => {
		const response = new ResponseWrapper<Product[]>();
		try {
			const data: Product[] = await productService.getProducts();
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			response.setError(e.message);
		}
		res.json(response);
	});

	router.post("/create", async (req: Request, res: Response) => {
		const response = new ResponseWrapper<Product>();
		try {
			const productFields: IProductCreationDetails = {
				name: req.body.name,
				description: req.body.description,
				type: req.body.type.toUpperCase(),
				unit: req.body.unit,
				price: req.body.price,
				available: req.body.available,
				supplier: req.body.supplier,
				banner: req.body.banner,
			};
			const data: Product =
				await productService.createProduct(productFields);
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			response.setError(e.message);
		}
		res.json(response);
	});

	router.get("/category/:type", async (req: Request, res: Response) => {
		const response = new ResponseWrapper<Product[]>();
		try {
			const categoryType: string = req.params.type
				.toString()
				.toUpperCase();
			const data: Product[] =
				await productService.getProductsByCategory(categoryType);
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			response.setError(e.message);
		}
		res.json(response);
	});

	router.get("/detailPage/:id", async (req: Request, res: Response) => {
		const response = new ResponseWrapper<DetailPageProduct>();
		try {
			const productId: string = req.params.id.toString();
			const data: DetailPageProduct =
				await productService.getDetailPageProduct(productId);
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			response.setError(e.message);
		}
		res.json(response);
	});
};
