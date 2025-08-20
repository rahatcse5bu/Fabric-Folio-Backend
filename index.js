import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";
import colors from "colors";

const connectDB = async () => {
	try {
		console.log(config.MONGODB_URI);
		const conn = await mongoose.connect(config.MONGODB_URI);
		console.log(
			`MongoDB Connected: ${conn.connection.host}🔥🔥🔥🚀🚀`.green.underline
		);
		app.listen(config.port, () => {
			console.log(`Server listening on ${config.port}`.yellow.underline);
		});
	} catch (err) {
		console.error(`Error:${err.message}`.red.underline.bold);
		process.exit(1);
	}
};
connectDB();
