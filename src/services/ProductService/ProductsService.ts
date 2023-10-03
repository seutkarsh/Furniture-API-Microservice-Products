import { Container, Inject, Service } from "typedi";
import mongoose, { Connection, Model } from "mongoose";

@Service()
export class ProductsService {
	private productSchema: Model<mongoose.Document> =
		Container.get("ProductSchema");
	async getProducts() {
		const products = await this.productSchema.find();
		if (!products.length)
			throw new Error(ProductServiceErrors.NO_PRODUCTS_FOUND);
		return products;
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
