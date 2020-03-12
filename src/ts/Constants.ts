export type LISTENER_TYPES = "user" | "org" | "projects" | "project" | "team";

export type FAVOURITE_TYPES = "product" | "project" | "all";

/**
 * Strings
 */
export const RES_FORBIDDEN = "Not authorized.";
export const RES_UNAUTHORIZED = "Not authorized.";
export const paramMissingError =
  "One or more of the required parameters was missing.";
export const loginFailedErr = "Login failed";

/**
 * Numbers
 */
export const pwdSaltRounds = 12;
// Default JWT exp
export const jwtCookieExp = process.env.COOKIE_JWT_EXP_DAYS || 3;

/**
 * Enums
 */
export enum ROLE {
  STANDARD_USER = 0,
  TEAM_ADMIN = 5,
  GLOBAL_ADMIN = 10
}
