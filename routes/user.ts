import express from "express";
import {
  getApplicationStats,
  getCurrentUser,
  test,
  updateUser,
} from "../controllers/user.js";
import { authorizePermissions, checkTestUser } from "../middleware/authMiddleware.js";
import { UserRole } from "@prisma/client";
import upload from "../middleware/formDataMiddleware.js";
const router = express.Router();

router.route("/current-user").get(getCurrentUser);
router.get("/admin/app-stats",authorizePermissions(UserRole.ADMIN),getApplicationStats);
router.patch("/update-user" , checkTestUser, upload.single('avatar'), updateUser);
router.get('/test', test);
export default router;
