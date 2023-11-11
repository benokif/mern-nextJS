
import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

import prisma from "../prisma.js";
import { validateMiddleware } from "../middleware/validation.js";
import { UserLoginSchema, UserSchema } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { createJWT } from "../utils/tokenUtils.js";
import upload from "../middleware/formDataMiddleware.js";

const register = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  
  const c = await prisma.user.count();

  req.body.role = c === 0 ? "ADMIN" : "USER";

  let { name, email, password, lastName, location, role } = req.body;
  const content = { name, email, password, lastName, location, role, avatar: '', avatarHash: '' };
  validateMiddleware(UserSchema, content, res);
  content.password = await hashPassword(content.password);
  // if (!company || !position)
  //   throw new CustomError.BadRequestError(
  //     "Company and Position need to be filled"
  //   );
  try {
    const newUser = await prisma.user.create({
      data: content,
    });
    res.status(StatusCodes.CREATED).json({ msg: "user created" });
  } catch (error) {
    next(error);
  }
};

const login = async (req: CustomRequest, res: Response) => {
  const { email, password } = req.body;
  const content = { email, password };
  validateMiddleware(UserLoginSchema, content, res);
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  
  
  if (!user)
    throw new CustomError.NotFoundError(`no user found for this email`);
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect)
    throw new CustomError.NotFoundError(`invalid password`);

  
  const token = createJWT({
    userId: user.id,
    role: user.role,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

const logout = (req: CustomRequest, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};


const test = (req: CustomRequest, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "test!" });
};

export { register, login, logout, test };
