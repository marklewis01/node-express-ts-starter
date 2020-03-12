export module ServerTypes {
  interface Token {
    iat: number;
    exp: number;
    oid: number; // org id
    rid: number; // role id
    uid: number; // user id
  }
}
