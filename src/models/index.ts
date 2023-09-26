import mongoose from "mongoose";
import ProductSchema from "./productSchema";

export const models: Array<{
	name: string;
	model: mongoose.Model<mongoose.Document>;
}> = [ProductSchema];
