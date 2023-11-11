// custom.d.ts
import { UserRole } from "@prisma/client";
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    // Define the structure of your 'user' property here
    userId: string;
    role: UserRole;
    testUser: boolean;
    // ... other properties
  };
}
