import { DriverState } from "../enum/DriverState";

export class DriverStateVO{
    public readonly value: DriverState;

    constructor( state: DriverState ){
        if(!Object.values(DriverState).includes(state)){
            throw new Error ("Driver state invalid")
        }
        this.value = state;
    }

    public toString(): string{
        return this.value;
    }

}