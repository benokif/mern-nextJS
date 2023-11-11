import { nanoid } from "nanoid";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

import prisma from "../prisma.js";
import { validateMiddleware } from "../middleware/validation.js";
import { UserLoginSchema, UserRole, UserSchema, exclude } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { createJWT } from "../utils/tokenUtils.js";

import { v2 as cloudinary } from "cloudinary";
import { PathOrFileDescriptor, promises as fs } from "fs";
import { readFileSync } from "fs";
import bcrypt from "bcryptjs";
import { formatImage } from "../middleware/formDataMiddleware.js";

const getCurrentUser = async (req: CustomRequest, res: Response) => {
  if (!req.user)
    throw new CustomError.UnauthenticatedError("authentication invalid");
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
  });

  if (!user) throw new CustomError.BadRequestError("user does not exist");

  const userPrivate = exclude(user, ["password"]);
  res.status(StatusCodes.OK).json({ userPrivate });
};

const getApplicationStats = async (req: CustomRequest, res: Response) => {
  const users = await prisma.user.count();
  const jobs = await prisma.job.count();
  res.status(StatusCodes.OK).json({ users: users, jobs: jobs });
};

const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user)
    throw new CustomError.UnauthenticatedError("authentication invalid");
  const { name, lastName, email, location } = req.body;
  const newUser: any = { name, lastName, email, location };

  // 1 - get user
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
  });

  if (!user) throw new CustomError.BadRequestError("user does not exist");

  //  🔧 update avatar if a file was uploaded
  if (req.file && req.file.size > 0) {
    const file = formatImage(req.file);
    if (!file)
      throw new CustomError.CustomAPIError("media file handling error");

    // Hash the file
    //    Hash the binary file data (you may need to use a more suitable hash function for binary data)
    const hashedData = await bcrypt.hash(
      req.file.buffer.toString("base64"),
      10
    );

    // Check if the user already has an avatar
    if (user.avatar) {
      // Delete the old avatar from Cloudinary
      const publicId = user.avatar.split("/").slice(-1)[0].split(".")[0];

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        next(error);
      }
    }

    try {
      // 🍊 'upload()' error if file empty
      // Upload the new avatar to Cloudinary
      const res = await cloudinary.uploader.upload(file);
      newUser.avatar = res.secure_url;
      newUser.avatarHash = hashedData;
    } catch (error) {
    next(error);
    }

    //await fs.unlink(req.file.path); //only for disk storage
  }
  const userUpdated = await prisma.user.update({
    where: { id: req.user.userId },
    data: newUser,
  });
  const userPrivate = exclude(userUpdated, ["password"]);
  res.status(StatusCodes.OK).json({ userPrivate });
};
const test = (req: CustomRequest, res: Response) => {
  if (!req.user)
    throw new CustomError.UnauthenticatedError("authentication invalid");
  
  
    // const user = await prisma.user.findUnique({
  //   where: {
  //     id: req.user.userId,
  //   },
  // });

  // if (!user) throw new CustomError.BadRequestError("user does not exist");
setTimeout(() => {
  res.status(StatusCodes.OK).json({ msg: "test!" });
}, 300);
  // const userPrivate = exclude(user, ["password"]);
};

export { getApplicationStats, getCurrentUser, updateUser, test };
