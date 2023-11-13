import express from "express";
import { register, login, logout, test } from "../controllers/auth.js";
import upload from "../middleware/formDataMiddleware.js";

import { rateLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();

router.post("/register", rateLimiter, register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/test", test);

export default router;
