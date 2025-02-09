import { BaseError } from "./baseError";

export class NotFoundError extends BaseError{
    constructor(message: string){
        super(message, 404, "NOT_FOUD");
    }
}