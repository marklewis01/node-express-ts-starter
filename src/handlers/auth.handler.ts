import { RequestHandler } from "express";
import statusCode from "http-status-codes";

import { logger } from "@shared";
import { Constants } from "@ts";

/**
 * [POST] Login existing user
 */
export const loginUser: RequestHandler = async (req, res) => {
  // Check email and password present
  const { email_address, password } = req.body;

  if (!(email_address && password)) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json({ error: Constants.paramMissingError });
  }

  try {
    // Insert logic to fetch user from db

    // validate db response, return if user does not exist

    // user is valid, create token

    // Return OK
    return res.status(statusCode.OK).json({
      user: "user object",
      token: "a token string"
    });
  } catch (err) {
    logger.error(err.message, err);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong." });
  }
};

/**
 * [GET] Logout current user
 */
export const logoutUser: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split("Bearer ")[1]
      : null;

    if (token) {
      // perform logout logic and update session data
    }

    return res.status(statusCode.OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(statusCode.BAD_REQUEST).json({
      error: err.message
    });
  }
};
