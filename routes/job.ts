import express from 'express'
import {
  getJobs, createJob, updateJob, deleteJob, getSingleJob, getStats
} from '../controllers/job.js'
import { checkTestUser } from '../middleware/authMiddleware.js';
import rateLimiter from "express-rate-limit";
const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: "IP rate limit exceeded, try in 15 minutes" },
});

router.route("/").get(getJobs).post(apiLimiter,checkTestUser,createJob);

router.route("/stats").get(getStats)
router
  .route("/:id")
  .get(getSingleJob)
  .patch(checkTestUser, updateJob)
  .delete(checkTestUser, deleteJob);

export default router
