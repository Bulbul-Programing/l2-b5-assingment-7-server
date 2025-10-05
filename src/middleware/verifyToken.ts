import type { NextFunction, Request, Response } from "express";
import type { TUserRole } from "../modules/user/TUser";
import catchAsync from "../Utils/catchAsync";
import AppError from "../error/AppError";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { envVars } from "../envConfig/env";

const verifyToken = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
      throw new AppError(401, 'You are not authorized!');
    }

    const token = tokenWithBearer?.split(' ')[1]

    if (!token) {
      throw new AppError(401, 'Invalid token!');
    }

    const decoded = jwt.verify(
      token,
      envVars.ACCESS_TOKEN_SECRETE as string,
    ) as JwtPayload;

    // const { email, role } = decoded;
    // const user = await isUserExist(email);

    // if (!user) {
    //   throw new AppError(404, 'user not found!');
    // }

    // if (requiredRoles && !requiredRoles.includes(role)) {
    //   throw new AppError(401, 'You have no access to this route!');
    // }

    // req.user = decoded as JwtPayload;
    next();
  });
};

export default verifyToken;
