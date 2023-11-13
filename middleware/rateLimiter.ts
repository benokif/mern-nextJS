import { NextFunction, Response } from "express";
import CustomError from "../errors/index.js";
import { CustomRequest } from "../types/custom";
import rateLimit from "../utils/rateLimit.js";

const limiter = rateLimit({
  interval: 10 * 60 * 1000, // 10 minutes
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export const rateLimiter = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await limiter.check(res, 5, "CACHE_TOKEN"); // 5 requests per 10 minutes
    next();
  } catch {
    throw new CustomError.TooManyRequests(
      "IP rate limit exceeded, try in 10 minutes"
    );
  }
};
