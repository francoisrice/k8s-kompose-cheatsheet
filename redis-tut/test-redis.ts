require("dotenv").config();
import { createClient } from "redis";

const redisServiceHost = process.env.REDIS_MASTER_SERVICE_HOST || "localhost";

const redisServicePort = process.env.REDIS_SERVICE_SERVICE_PORT || "6379";

const client = createClient({
	url: `redis://${redisServiceHost}:${redisServicePort}`,
});

const main = async () => {
	await client.connect();

	try {
		await client.set("key", "value");
		const value = await client.get("key");

		console.log("value: ", value);
	} catch (error) {
		console.error("Redis Client Error", error);
	} finally {
		await client.disconnect();
	}
};

setInterval(async () => {
	await main();
}, 10000);

// setInterval(main, 10000);

/* 
// Store an Object
await client.hSet("candle", {
	open: 1,
	high: 2,
	low: 3,
	close: 4,
	volume: 5,
});

const trade = await client.hGetAll("trade");
*/
