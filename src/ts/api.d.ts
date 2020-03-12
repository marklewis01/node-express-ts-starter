declare module APITypes {
  module req {
    interface login {
      email_address: string;
      password: string;
    }

    interface register {
      email_address: string;
      first_name: string;
      last_name: string;
      password: string;
    }

    module Org {
      interface invite {
        email_address: string;
        first_name: string;
        last_name: string;
      }
      interface toggleAdmin {
        email_address: string;
      }
    }
  }
}

export { APITypes };
