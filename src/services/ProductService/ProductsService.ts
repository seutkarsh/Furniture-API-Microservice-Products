import { Container, Service } from "typedi";
import mongoose, { Model } from "mongoose";
import { generateImageLink } from "../UtilityService/UtilityService";
import { IProductSchema } from "../../models/Schemas/productSchema";

@Service()
export class ProductsService {
	private productSchema: Model<IProductSchema & mongoose.Document> =
		Container.get("ProductSchema");
	async getProducts() {
		const products: IProductSchema[] = await this.productSchema.find();
		if (!products.length)
			throw new Error(ProductServiceErrors.NO_PRODUCTS_FOUND);

		const preparedProducts: Product[] = products.map((products) => {
			return new Product(products);
		});
		return preparedProducts;
	}

	async createProduct(productDetails: IProductCreationDetails) {
		const product = await this.productSchema.create(productDetails);
		if (!product)
			throw new Error(ProductServiceErrors.PRODUCT_CREATION_FAILED);
		return new Product(product);
	}

	async getProductsByCategory(categoryType: string) {
		const products: IProductSchema[] = await this.findByType(categoryType);
		if (!products.length)
			throw new Error(ProductServiceErrors.NO_PRODUCTS_IN_CATEGORY);
		const preparedProducts: Product[] = products.map((products) => {
			return new Product(products);
		});
		return preparedProducts;
	}

	async getDetailPageProduct(productId: string) {
		const productData: IProductSchema | null =
			await this.findById(productId);
		if (!productData)
			throw new Error(ProductServiceErrors.NO_PRODUCTS_FOUND);
		return new DetailPageProduct(productData);
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
	NO_PRODUCTS_IN_CATEGORY = "No Products Listed in this Category",
}

export class Product {
	name: string;
	description: string;
	banner: string;
	type: string;
	unit: number;
	price: number;
	available: boolean;
	supplier: string;

	constructor(product: IProductSchema) {
		this.name = product.name;
		this.description = product.description;
		this.banner = generateImageLink(product.banner);
		this.type = product.type.toUpperCase();
		this.price = parseFloat(product.price.toPrecision(2));
		this.available = product.available;
		this.supplier = product.supplier.toUpperCase();
		this.unit = product.unit;
	}
}

export interface IDPProductInfo {
	name: string;
	description: string;
	price: number;
}
export class DetailPageProduct {
	productInfo: IDPProductInfo;
	productBanner: string;
	productInventory: number;

	constructor(product: IProductSchema) {
		this.productInfo = {
			name: product.name,
			description: product.description,
			price: product.price,
		};
		this.productBanner = generateImageLink(product.banner);
		this.productInventory = product.unit;
	}
}
