import express from 'express';
import { getJobs, createJob, updateJob, deleteJob, getSingleJob } from '../controllers/job.js';
import { checkTestUser } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route("/").get(getJobs).post(checkTestUser, createJob);
router
    .route("/:id")
    .get(getSingleJob)
    .patch(checkTestUser, updateJob)
    .delete(checkTestUser, deleteJob);
export default router;
