import { BaseError } from "./baseError";

export class KafkaError extends BaseError{
    constructor(message: string){
        super(message, 500, "KAFKA_ERROR");
    }
}