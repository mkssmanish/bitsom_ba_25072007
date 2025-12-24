/**
 * mongodb_operations.js
 * Operations on products_catalog.json using MongoDB
 */

const { MongoClient } = require("mongodb");
const fs = require("fs");

// MongoDB connection URL and DB name
const url = "mongodb://localhost:27017";
const dbName = "fleximart";

async function main() {
    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName);
        const products = db.collection("products");Method A: Pass via Templat
        console.log("Data loaded into 'products' collection");

        // -------------------------
        // Operation 2: Basic Query
        // -------------------------
        console.log("\nElectronics products with price < 50000:");
        const electronics = await products.find(
            { category: "Electronics", price: { $lt: 50000 } },
            { projection: { _id: 0, name: 1, price: 1, stock: 1 } }
        ).toArray();
        console.log(electronics);

        // -------------------------
        // Operation 3: Review Analysis
        // -------------------------
        console.log("\nProducts with average rating >= 4.0:");
        const avgRatingProducts = await products.aggregate([
            { $unwind: "$reviews" },
            { $group: {
                _id: "$product_id",
                name: { $first: "$name" },
                avgRating: { $avg: "$reviews.rating" }
            }},
            { $match: { avgRating: { $gte: 4.0 } } },
            { $project: { _id: 0, product_id: "$_id", name: 1, avgRating: 1 } }
        ]).toArray();
        console.log(avgRatingProducts);

        // -------------------------
        // Operation 4: Update Operation
        // -------------------------
        console.log("\nAdding new review to ELEC001:");
        await products.updateOne(
            { product_id: "ELEC001" },
            { $push: { reviews: { user_id: "U999", rating: 4, comment: "Good value", date: new Date() } } }
        );
        console.log("Review added.");

        // -------------------------
        // Operation 5: Complex Aggregation
        // -------------------------
        console.log("\nAverage price by category:");
        const avgPriceByCategory = await products.aggregate([
            { $group: {
                _id: "$category",
                avg_price: { $avg: "$price" },
                product_count: { $sum: 1 }
            }},
            { $project: { _id: 0, category: "$_id", avg_price: 1, product_count: 1 } },
            { $sort: { avg_price: -1 } }
        ]).toArray();
        console.log(avgPriceByCategory);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// Run the main function
main();
