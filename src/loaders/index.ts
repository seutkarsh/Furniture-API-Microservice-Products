import { Application } from "express";
import expressLoader from "./express";

export default async (expressApp: Application): Promise<void> => {
	await expressLoader(expressApp);
	console.log("Express Loaded Successfully");
};
