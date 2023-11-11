import { z } from "zod";
import { User } from "@prisma/client";
const USERROLE = ["USER", "ADMIN"] as const;

export enum UserRole {
  User = "USER",
  Admin = "ADMIN",
}


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
})

type Key = keyof User

export const exclude = (
  user: User,
  keys: Key[]
): Omit<User, Key> => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Key))
  );
}