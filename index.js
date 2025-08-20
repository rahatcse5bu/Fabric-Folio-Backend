import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";
import colors from "colors";

let isConnected = false;

async function connectDB() {
	if (!isConnected) {
		try {
			console.log(config.MONGODB_URI);
			const conn = await mongoose.connect(config.MONGODB_URI);
			console.log(
				`MongoDB Connected: ${conn.connection.host}🔥🔥🔥🚀🚀`.green.underline
			);
			isConnected = true;
		} catch (err) {
			console.error(`Error:${err.message}`.red.underline.bold);
			throw err;
		}
	}
}

export default async function handler(req, res) {
	await connectDB();
	app(req, res);
}
