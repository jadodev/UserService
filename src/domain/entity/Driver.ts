import { User } from "./User";
import { DriverStateVO } from "../valueObjects/DriverStateVO";
import { UserRole } from "../enum/UserRole";
import { Phone } from "../valueObjects/Phone";

export class Driver extends User {
    private state: DriverStateVO;

    constructor(id: string, name: string , state: DriverStateVO, phone: Phone){
        super(id, name, UserRole.DRIVER, phone);
        this.state = state;
    }

    public setState( state: DriverStateVO ): void{
        this.state = state;
    }
}