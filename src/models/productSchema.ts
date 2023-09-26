import mongoose, { Connection, Document } from "mongoose";
import { Container } from "typedi";
import config from "../config";

const ProductSchema = new mongoose.Schema({
	name: String,
	description: String,
	banner: String,
	type: String,
	unit: Number,
	price: Number,
	available: Boolean,
	supplier: String,
});

export interface IProductSchema extends Document {
	name: string;
	description: string;
	banner: string;
	type: string;
	unit: number;
	price: number;
	available: boolean;
	supplier: string;
}
export default {
	name: "ProductSchema",
	model: Container.get<Connection>(config.mongo.db.name).model(
		"ProductSchema",
		ProductSchema,
		"products",
	),
};
