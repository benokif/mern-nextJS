// import { body, validationResult } from "express-validator";
// import CustomError from "../errors/index";
// import BadRequestError from "../errors/bad-request";
// import { NextFunction, Request, Response } from "express";

import { Response } from "express";
import { CustomRequest } from "../types/custom";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { Job } from "@prisma/client";
import { z } from "zod";

// 🤖 validation middleware - adapt based on run-time validator - here, ZOD
export const validateMiddleware = async (
  schema: z.AnyZodObject,
  content: Object,
  res: Response
) => {
  const result = schema.safeParse(content);
  if (!result.success) {
    let msg: string = "";
    result.error.issues.map((issue) => {

      const typedIssue = issue as z.ZodIssue & {
        expected: string;
        received: string;
      };
      const { code, path, message, expected, received } = typedIssue;

      if (message === "Required") {
        msg += `Input error with ${path[0]}: it is required to be a valid ${expected}, but what was sent was ${received}.`;
      } else {
        msg += `Input error with ${path[0]}: ${message}.`;
      }
    });
    return res.status(StatusCodes.BAD_REQUEST).json({ msg });
  }
  return;
};

export const verifyUserMatchesId = (req: CustomRequest, job: Job) => {
  if (!req.user)
    throw new CustomError.UnauthenticatedError("authentication invalid");
  const isAdmin = req.user.role === "ADMIN";
  const isOwner = req.user.userId === job.authorId.toString();
  if (!isAdmin && !isOwner)
    throw new CustomError.UnauthenticatedError(
      `not authorized to access this route`
    );
  return;
};

// const IsValidInput = (validateValues) => {
//   return [
//     validateValues,
//     (req: Request, res: Response, next: NextFunction) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const errorMessages: string = errors.array().map((err) => err.msg);
//         throw new BadRequestError(errorMessages);
//       }
//       next();
//     },
//   ];
// };

// export const validateInput = IsValidInput([
//   body('name').notEmpty().withMessage('name is required').isLength({ min: 5}).withMessage('name must be at least 5 characters')
// ]
// )
