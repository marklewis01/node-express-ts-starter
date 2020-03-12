declare module SchemaTypes {
  interface User {
    id: number;
    email_address: string;
    first_name: string;
    last_name: string;
    password?: string;
    readonly created_at: string;
  }

  interface UserCredentials {
    org_id: number;
    user_id: number;
    last_login: string;
    role_id: number;
  }
}

export { SchemaTypes };
