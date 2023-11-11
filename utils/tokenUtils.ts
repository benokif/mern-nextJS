import { UserRole } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken'

// 🔧must define the interface, as TypeScript doesn't know the structure of the payload when decoding using 'jwt.verify'

interface JwtPayload {
  userId: string;
  role: UserRole;
  // Add any other properties you have in your payload
}
export const createJWT = function (payload: Object) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as Secret,//process.env.JWT_SECRET,
    {
      expiresIn: '1d',//process.env.JWT_LIFETIME,
    }
  )
}

export const verifyJWT = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
  return decoded;
};