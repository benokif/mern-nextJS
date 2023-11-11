import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
const app = express();
// routers
import jobRouter from "./routes/job.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const __dirname = dirname(fileURLToPath(import.meta.url));
//dev: logger
if (process.env.NODE_ENV === "development")
    app.use(morgan("dev"));
//middleware
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser()); // gives access to 'cookies' property in request
app.use(express.json()); // parse JSON data
app.use(express.urlencoded({ extended: true })); //parse URL-encoded form data
app.get("/api/v1/test", (req, res) => {
    res.json({ msg: "proxuy working" });
});
app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
// error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// app starting
const port = process.env.port || 5102;
const start = async () => {
    //let connectionString = `${process.env.MONGO_URI}${process.env.MONGO_PASSWORD}${process.env.MONGO_ENDPOINT}`;
    try {
        //await connectDB(process.env.DATABASE_URL);
        app.listen(port, () => console.log(`listening on port ${port}`));
    }
    catch (error) { }
};
start();
