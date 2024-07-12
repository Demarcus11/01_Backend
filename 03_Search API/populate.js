// The file populates the DB with all the products from the "products.json" file

import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import { model as Product } from "./models/product.js";
import jsonProducts from "./products.json" assert { type: "json" };

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); // delete the products currently in the DB to always use the most update to date products.json array
    await Product.create(jsonProducts);
    console.log("Successfully added products!");
    process.exit(0); // process.exit() terminates the current script/file, so once we add the products to the DB, we don't need this DB connection running anymore. param 0 means everything went ok, param 1 means there was an error.
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
