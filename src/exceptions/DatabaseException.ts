import { BaseError } from "./baseError";

export class DatabaseException extends BaseError {
    constructor(message: string = "Database error") {
      super(message, 500, "Database Error");
      this.name = "DatabaseException";
    }
  }