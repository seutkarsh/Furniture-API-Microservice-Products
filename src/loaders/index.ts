import { Application } from "express";
import expressLoader from "./express";
import Logger from "./logger";

export default async (expressApp: Application): Promise<void> => {
	await expressLoader(expressApp);
	Logger.info("✌️ Express Loaded ✌️");
};
