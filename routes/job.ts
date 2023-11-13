import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getSingleJob,
  getStats,
} from "../controllers/job.js";
import { checkTestUser } from "../middleware/authMiddleware.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.route("/").get(getJobs).post(rateLimiter, checkTestUser, createJob);

router.route("/stats").get(getStats);
router
  .route("/:id")
  .get(getSingleJob)
  .patch(rateLimiter, checkTestUser, updateJob)
  .delete(rateLimiter, checkTestUser, deleteJob);

export default router;
