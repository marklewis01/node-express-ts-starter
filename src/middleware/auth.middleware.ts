import { Request, RequestHandler } from "express";
import statusCode from "http-status-codes";

import { JwtService, logger } from "@shared";
import { Constants } from "@ts";

// Init shared
const jwtService = new JwtService();

// Bearer token logic
export function getToken(req: Request) {
  // Check for Bearer token
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return "";
  }
  return req.headers.authorization.split("Bearer ")[1];
}

/**
 * Decodes session token(JWT), checks session is valid
 * (against session table), and if valid, returns claims.
 */
export async function decodeTokenCheckSession(token: string) {
  try {
    // Decode token (and if passes all tests, add to req.user)
    const claims = await jwtService.verifyJwt(token);

    // check jwt against session table using claims.uid
    // [insert db lookup code]

    // if (!session) {
    //   // no session found
    //   return null;
    // } else {
    return claims;
    // }
  } catch (err) {
    logger.error(err);
  }
}

export const auth: RequestHandler = async (req, res, next) => {
  try {
    // Check for Bearer token
    const token = getToken(req);
    if (!token) {
      return res.status(statusCode.UNAUTHORIZED).json({
        error: Constants.RES_UNAUTHORIZED
      });
    }

    const claims = await decodeTokenCheckSession(token);

    if (claims) {
      // req.user = claims; // commented for template purposes
      return next();
    } else {
      return res.status(statusCode.UNAUTHORIZED).json({
        error: Constants.RES_UNAUTHORIZED
      });
    }
  } catch (err) {
    logger.error(err);
    return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
  }
};

// Middleware to verify if user is an admin
export const globalAdminMW: RequestHandler = async (req, res, next) => {
  try {
    // Check for Bearer token
    const token = getToken(req);
    if (!token) {
      return res.status(statusCode.UNAUTHORIZED).json({
        error: Constants.RES_UNAUTHORIZED
      });
    }

    const claims = await decodeTokenCheckSession(token);

    if (claims) {
      // check for eligible claim value
      req.user = claims;
      return next();
    } else {
      return res.status(statusCode.UNAUTHORIZED).json({
        error: Constants.RES_UNAUTHORIZED
      });
    }
  } catch (err) {
    res.status(statusCode.UNAUTHORIZED).json({
      error: Constants.RES_UNAUTHORIZED
    });
  }
};
