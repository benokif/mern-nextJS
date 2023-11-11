import CustomError from "../errors/index.js";
import { verifyJWT } from "../utils/tokenUtils.js";
export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        throw new CustomError.UnauthenticatedError("authentication invalid");
    try {
        const { userId, role } = verifyJWT(token);
        // test user id taken from DB
        const testUser = userId === "6538d796adb7d26924195bb2";
        req.user = { userId, role, testUser };
        next();
    }
    catch (error) {
        throw new CustomError.UnauthenticatedError("authentication invalid");
    }
};
export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!req.user)
            throw new CustomError.UnauthenticatedError("authentication invalid");
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthenticatedError("unauhtorized to access this route");
        }
        next();
    };
};
export const checkTestUser = async (req, res, next) => {
    if (req.user?.testUser)
        throw new CustomError.BadRequestError("demo user, read only");
    next();
};
