import { z } from "zod";
const USERROLE = ["USER", "ADMIN"];
export var UserRole;
(function (UserRole) {
    UserRole["User"] = "USER";
    UserRole["Admin"] = "ADMIN";
})(UserRole || (UserRole = {}));
export const UserSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
    lastName: z.string().optional(),
    location: z.string().optional(),
    avatar: z.string().optional(),
    avatarHash: z.string().optional(),
    role: z.enum(USERROLE).optional(),
});
export const UserLoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
});
export const exclude = (user, keys) => {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
};
