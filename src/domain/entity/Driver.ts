import { User } from "./User";
import { UserRole } from "../enum/UserRole";
import { Phone } from "../valueObjects/Phone";

export class Driver extends User {
    
    constructor(id: string, name: string, phone: Phone){
        super(id, name, UserRole.DRIVER, phone);
    }

}