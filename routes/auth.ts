import express from "express";
import { register, login, logout, test } from "../controllers/auth.js";
import upload from "../middleware/formDataMiddleware.js";

import rateLimiter from 'express-rate-limit'
const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max:25,
  message:{msg:'IP rate limit exceeded, try in 15 minutes'}
})
router.post("/register",apiLimiter, register);
router.post("/login",apiLimiter, login);
router.get("/logout", logout);
router.get('/test', test)

export default router;
