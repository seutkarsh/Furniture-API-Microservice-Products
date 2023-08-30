import dotenv from "dotenv";
import * as procress from "process";

const envFound = dotenv.config();

if (!envFound) {
	throw new Error("⚠️ Couldn't Find ENV File ⚠️");
}

export default {
	apiEndpoint: procress.env.API_ENDPOINT || "http://localhost",
	port: parseInt(procress.env.PORT || "3000", 10) || 3000,
	logs: {
		level: procress.env.LOG_LEVEL || "silly",
	},
};
