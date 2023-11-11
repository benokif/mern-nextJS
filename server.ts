import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import helmet from "helmet";

// routers
import jobRouter from "./routes/job.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import next from "next";
import { parse } from "url";

// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//dev: logger

nextApp.prepare().then(() => {
  const server = express();
  if (process.env.NODE_ENV !== "production") server.use(morgan("dev"));
  //middleware
  server.use(cookieParser()); // gives access to 'cookies' property in request
  server.use(express.json()); // parse JSON data
  server.use(express.urlencoded({ extended: true })); //parse URL-encoded form data
  // server.use(helmet());

  //server.use("/api/v1/jobs", authenticateUser, jobRouter);
  server.use("/api/v1/jobs", authenticateUser, jobRouter);
  server.use("/api/v1/users", authenticateUser, userRouter);
  server.use("/api/v1/auth", authRouter);

  // front-end entry point
  server.all("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // Pass all other requests to Next.js
    return handle(req, res);
  });

  // // error handling
  server.use(notFoundMiddleware);
  server.use(errorHandlerMiddleware);

  // server starting

  const port = process.env.port || 3000;

  try {
    server.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    throw error;
  }
});
