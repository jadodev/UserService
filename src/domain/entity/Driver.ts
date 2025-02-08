import { User } from "./User";
import { DriverStateVO } from "../valueObjects/DriverStateVO";
import { UserRole } from "../enum/UserRole";
import { Phone } from "../valueObjects/Phone";
import { DriverState } from "../enum/DriverState";

export class Driver extends User {
    
    constructor(id: string, name: string , state: DriverStateVO, phone: Phone){
        const defaultState = state || new DriverStateVO(DriverState.WAITING_FOR_ASSIGNMENT);
        super(id, name, UserRole.DRIVER, phone, defaultState);
    }

    public setState( state: DriverStateVO ): void{
        if(this.getRole() === UserRole.DRIVER){
            (this as any).state = state;
        }
    }
}