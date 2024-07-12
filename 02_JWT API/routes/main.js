import express from "express";
import { login, dashboard } from "../controllers/main.js";
import { authenticationMiddleware } from "../middleware/auth.js";

export const router = express.Router();

router.route("/dashboard").get(authenticationMiddleware, dashboard); // protected route, everytime this route is request the middleware function will run
router.route("/login").post(login); // public route
