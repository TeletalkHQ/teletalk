import mongoose from "mongoose";
import { RedisClientType, createClient } from "redis";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { clientStatusStore } from "~/classes/ClientStatusStore";
import { configManager } from "~/classes/ConfigManager";
import { store } from "~/classes/Store";
import { utils } from "~/utils";

const initializeDatabases = async () => {
	await store.initialize(redisClient as RedisClientType);
	await authSessionStore.initialize(redisClient as RedisClientType);
	await clientStatusStore.initialize(redisClient as RedisClientType);
	await mongodbConnector();
};

const mongodbConnector = () => {
	const { DB: DB_CONFIGS } = configManager.getConfigs();

	mongoose.set("strictQuery", false);
	mongoose.connection.once("connected", () =>
		logger.info(`MongoDB connected to: ${DB_CONFIGS.MONGO_URI}`)
	);

	return mongoose.connect(DB_CONFIGS.MONGO_URI);
};

export const databaseUtils = {
	initializeDatabases,
	mongodbConnector,
	redisConnector,
};

// async function run() {
//   try {
//     // Connect the session to the server	(optional starting in v4.7)
//     await session.connect();
//     // Send a ping to confirm a successful connection
//     await session.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the session will close when you finish/error
//     await session.close();
//   }
// }
// run().catch(console.dir);
