import jsonwebtoken, { VerifyErrors } from "jsonwebtoken";
import { Constants } from "@ts";

import { logger, pick } from "@shared";
import { SchemaTypes, ServerTypes } from "@ts";

export class JwtService {
  private readonly secret: string;
  private readonly options: object;
  private readonly VALIDATION_ERROR = "JSON-web-token validation failed.";

  constructor() {
    this.secret = process.env.JWT_SECRET!;
    this.options = {
      expiresIn: Constants.jwtCookieExp + " days"
    };
  }

  /**
   * Encrypt data and return jwt.
   *
   * @param data
   */
  public createJwt = async (data: SchemaTypes.UserCredentials) => {
    try {
      // refine which user fields included in token
      const keys = ["user_id", "org_id", "role_id"];
      const pickedData = pick(data, keys);

      const tokenData = {
        uid: pickedData.user_id,
        oid: pickedData.org_id,
        rid: pickedData.role_id
      } as ServerTypes.Token;

      const token = jsonwebtoken.sign(tokenData, this.secret, this.options);

      // add JWT to session table (commented out for starter as db not included)
      // await authQueries.createSession(tokenData.oid, tokenData.uid, token);

      return {
        token,
        tokenData
      };
    } catch (err) {
      logger.error(err);
      return err;
    }
  };

  /**
   * Verifies an ID token (JWT). If the token is valid, the promise is
   * fulfilled with the token's decoded claims; otherwise, the promise is
   * rejected.
   *
   * @param idToken The ID token to verify
   * @return A promise fulfilled with the
   *   token's decoded claims if the ID token is valid; otherwise, a rejected
   *   promise.
   */
  public verifyJwt = (jwt: string): Promise<ServerTypes.Token> => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(
        jwt,
        this.secret,
        (err: VerifyErrors, decoded: object | string) => {
          if (err) {
            reject(this.VALIDATION_ERROR);
          } else {
            const token: any = decoded;
            // return decoded token
            resolve(token);
          }
        }
      );
    });
  };
}
