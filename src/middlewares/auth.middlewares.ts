import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { IUser } from "../models/user.model.js"; 

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

interface DecodedToken extends JwtPayload {
  _id: string;
}

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      throw new ApiError(401, "Access token missing");
    }

    let decodedToken: DecodedToken;

    try {
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as unknown;
      decodedToken = verified as DecodedToken;

      if (!decodedToken._id) {
        throw new ApiError(401, "Token missing user ID");
      }
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw new ApiError(401, "JWT expired");
      } else {
        throw new ApiError(401, "Invalid token");
      }
    }

    // 🔥 CRITICAL MISSING PART: Fetch user from database
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // Attach user to request object
    req.user = user;
    
    // Call next middleware
    next();
    
  } catch (error) {
    throw new ApiError(401,  "Invalid access token");
  }
});