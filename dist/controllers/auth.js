import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../prisma.js";
import { validateMiddleware } from "../middleware/validation.js";
import { UserLoginSchema, UserSchema } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { createJWT } from "../utils/tokenUtils.js";
const register = async (req, res, next) => {
    // handle media file - multer
    console.log(req.file);
    const c = await prisma.user.count();
    console.log("💄", req.body);
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
    }
    catch (error) {
        next(error);
    }
};
const login = async (req, res) => {
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
    console.log(user.id);
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({ msg: "user logged in" });
};
const logout = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
export { register, login, logout };
