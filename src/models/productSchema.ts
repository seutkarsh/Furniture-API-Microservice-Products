import mongoose, { Connection } from "mongoose";
import { Container } from "typedi";
import config from "../config";

const productSchema = new mongoose.Schema({
	name: String,
	desc: String,
	banner: String,
	type: String,
	unit: Number,
	price: Number,
	available: Boolean,
	supplier: String,
});

export interface IProductSchema {
	name: string;
	desc: string;
	banner: string;
	type: string;
	unit: number;
	price: number;
	available: boolean;
	supplier: string;
}
export default {
	name: "ProductSchema",
	model: Container.get<Connection>(config.mongo.db.name).model<
		IProductSchema & mongoose.Document
	>("ProductSchema", productSchema, "products"),
};
