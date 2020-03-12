import { APITypes, SchemaTypes } from "@ts";

export class Validate {
  public isEmail(email: string) {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) {
      return true;
    }

    return false;
  }

  public isEmpty(s?: string) {
    if (typeof s !== "string" || s === undefined || s.trim() === "") {
      return true;
    }
    return false;
  }

  public validateInviteData(data: APITypes.req.Org.invite) {
    const errors: Partial<APITypes.req.register> = {};

    // email validation
    if (this.isEmpty(data.email_address)) {
      errors.email_address = "Must not be empty.";
    } else if (!this.isEmail(data.email_address)) {
      errors.email_address = "Must be a valid email address.";
    }

    // name validation
    if (this.isEmpty(data.first_name)) {
      errors.first_name = "Must not be empty.";
    }
    if (this.isEmpty(data.last_name)) {
      errors.last_name = "Must not be empty.";
    }

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  }

  public validateRegisterData(data: Partial<SchemaTypes.User>) {
    const errors: Partial<SchemaTypes.User> = {};

    // email validation
    if (this.isEmpty(data.email_address)) {
      errors.email_address = "Must not be empty.";
    } else if (!this.isEmail(data.email_address!)) {
      errors.email_address = "Must be a valid email address.";
    }

    // name validation
    if (this.isEmpty(data.first_name)) {
      errors.first_name = "Must not be empty.";
    }
    if (this.isEmpty(data.last_name)) {
      errors.last_name = "Must not be empty.";
    }

    // password validation
    if (this.isEmpty(data.password)) {
      errors.password = "Must not be empty.";
    }

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  }

  public validateNotEmpty(data: { [key: string]: string | number | null }) {
    const errors: { [key: string]: string } = {};

    for (const key in data) {
      if (typeof data[key] === "string" && this.isEmpty(data[key] as string)) {
        errors[key] = "Must not be empty.";
      } else {
        if (data[key] === null) {
          errors[key] = "Must not be empty.";
        }
      }
    }

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  }
}
