import { Inject, Service } from "typedi";
import { Document, Model } from "mongoose";
import { IProductSchema } from "../../models/productSchema";

@Service()
export class ProductsService {
	constructor(
		@Inject("ProductSchema")
		private productSchema: Model<IProductSchema & Document>,
	) {}

	async getProducts() {
		const products = await this.productSchema.find();
		if (!products.length)
			throw new Error(ProductServiceErrors.NO_PRODUCTS_FOUND);
	}

	async createProduct(productDetails: IProductCreationDetails) {
		const product = await this.productSchema.create(productDetails);
		if (!product)
			throw new Error(ProductServiceErrors.PRODUCT_CREATION_FAILED);
		return product;
	}

	async getProductsByCategory(categoryType: string) {
		const products = await this.findByType(categoryType);
		return products;
	}

	async getDetailPageProduct(productId: string) {
		const productData = await this.findById(productId);
		return productData;
	}

	private async findByType(type: string) {
		return this.productSchema.find({ type: type });
	}

	private async findById(id: string) {
		return this.productSchema.findById(id);
	}
}

export interface IProductCreationDetails {
	name: string;
	description: string;
	banner: string;
	type: string;
	unit: number;
	price: number;
	available: boolean;
	supplier: string;
}

export enum ProductServiceErrors {
	PRODUCT_CREATION_FAILED = "Product Creation Failed for Some Reason",
	NO_PRODUCTS_FOUND = "No Products Found",
}
