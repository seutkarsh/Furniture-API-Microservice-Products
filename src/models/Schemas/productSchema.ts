import mongoose, { Connection } from "mongoose";
import { Container } from "typedi";

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

export interface IProductSchema {
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
	model: Container.get<Connection>(
		"mongoDBConnection",
	).model<mongoose.Document>("ProductSchema", ProductSchema, "products"),
};
