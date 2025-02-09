import { BaseError } from "./baseError";

export class NotFoundError extends BaseError{
    constructor(resource: string){
        super(`${resource} not found`, 404, "NOT_FOUD");
    }
}