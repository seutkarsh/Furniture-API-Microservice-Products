import mongoose from "mongoose";
import ProductSchema from "./Schemas/productSchema";

export const models: Array<{
	name: string;
	model: mongoose.Model<mongoose.Document>;
}> = [ProductSchema];
