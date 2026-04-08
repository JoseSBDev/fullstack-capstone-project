// db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

let dbInstance = null;
const dbName = "giftdb"; // tu base de datos

async function connectToDatabase() {
    if (dbInstance) return dbInstance;

    const url = process.env.MONGO_URL;

    const client = new MongoClient(url);

    try {
        await client.connect();

        // asigna la variable global, no const local
        dbInstance = client.db(dbName);

        console.log("Connected successfully to MongoDB");
        return dbInstance;

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectToDatabase;