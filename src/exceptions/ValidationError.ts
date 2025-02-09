import { BaseError } from "./baseError";

export class ValidationError extends BaseError {
    constructor(message: string ){
        super(message, 400, "VALIDATION_ERROR")
    }
}