import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../prisma.js";
import { exclude } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import { readFileSync } from "fs";
import bcrypt from "bcryptjs";
const getCurrentUser = async (req, res) => {
    if (!req.user)
        throw new CustomError.UnauthenticatedError("authentication invalid");
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.userId,
        },
    });
    if (!user)
        throw new CustomError.BadRequestError("user does not exist");
    const userPrivate = exclude(user, ["password"]);
    res.status(StatusCodes.OK).json({ userPrivate });
};
const getApplicationStats = async (req, res) => {
    const users = await prisma.user.count();
    const jobs = await prisma.job.count();
    res.status(StatusCodes.OK).json({ users: users, jobs: jobs });
};
const updateUser = async (req, res) => {
    if (!req.user)
        throw new CustomError.UnauthenticatedError("authentication invalid");
    const { name, lastName, email, location } = req.body;
    const newUser = { name, lastName, email, location };
    // 1 - get user
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.userId,
        },
    });
    if (!user)
        throw new CustomError.BadRequestError("user does not exist");
    if (req.file) {
        // TODO: remove all the hashing, too complex
        // just change front-end: display avatar, and offer to update a new file. No need to put a 'defautValue'
        // Hash the file
        //    Read the file as binary data
        const fileData = readFileSync(req.file.path);
        //    Hash the binary file data (you may need to use a more suitable hash function for binary data)
        const hashedData = await bcrypt.hash(fileData.toString("base64"), 10);
        // Check if the user already has an avatar AND it is not the same
        if (!user.avatarHash || hashedData !== user.avatarHash) {
            if (user.avatar) {
                // Delete the old avatar from Cloudinary
                const publicId = user.avatar.split("/").slice(-1)[0].split(".")[0];
                console.log("👑", publicId);
                await cloudinary.uploader.destroy(publicId);
            }
            // Upload the new avatar to Cloudinary
            const res = await cloudinary.uploader.upload(req.file.path);
            await fs.unlink(req.file.path);
            newUser.avatar = res.secure_url;
            newUser.avatarHash = hashedData;
        }
    }
    const userUpdated = await prisma.user.update({
        where: { id: req.user.userId },
        data: newUser,
    });
    const userPrivate = exclude(userUpdated, ["password"]);
    res.status(StatusCodes.OK).json({ userPrivate });
};
export { getApplicationStats, getCurrentUser, updateUser };
