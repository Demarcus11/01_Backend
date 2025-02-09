import express from "express";
import { getAllProducts, getAllProductsStatic } from "../controllers/products.js";

export const router = express.Router();

// Routes
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);
