import { Inject, Service } from "typedi";
import { Document, Model } from "mongoose";
import { IProductSchema } from "../models/productSchema";

@Service()
export class ProductsService {
	constructor(
		@Inject("ProductSchema")
		private productSchema: Model<IProductSchema & Document>,
	) {}
	async getProducts() {}
}
