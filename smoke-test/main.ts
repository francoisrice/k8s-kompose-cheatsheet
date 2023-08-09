require("dotenv").config();
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

export const mongo_read = async () => {
	await client.connect();

	const dbResponse = await client.db("dev").collection("BTCprices").findOne({});

	console.log(dbResponse);
};

const main = async () => {
	await mongo_read();
};

console.log(`Starting smoke test ...`);
setInterval(async () => {
	await main();
}, 5000);
