/**
 * General Shared Functions
 */

import bcrypt from "bcrypt";
import shortid from "shortid";
import { logger } from "@shared";

/**
 * Flatten Array
 *
 * @param arr - n-dimensional array *
 * @returns flattened array *
 * @usage flatten([[[1, [1.1]], 2, 3], [4, 5]]);
 * - returns [1, 1.1, 2, 3, 4, 5]
 */
export const flattenArray = (arr: any[]): [] => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten
    );
  }, []);
};

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000);
};

export const checkPassword = (p1: string, hash: string) =>
  bcrypt.compare(p1, hash);

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const pErr = (err: Error) => {
  if (err) {
    logger.error(err);
  }
};

export const shortId = () => shortid();

export const fbUid = (length: number = 20): string => {
  // Generates the same style UID as Firebase does.
  // SEE -- > https://gist.github.com/mikelehen/3596a30bd69384624c11

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < length; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
};
