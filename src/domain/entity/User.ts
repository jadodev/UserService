import { UserRole } from "../enum/UserRole";
import { Phone } from "../valueObjects/Phone";

export class User {
    private readonly id: string;
    private readonly name: string;
    private readonly role: UserRole;
    private readonly phone?: Phone;

    constructor( id: string, name: string, role: UserRole, phone: Phone ){
        this.id = id;
        this.name = name;
        this.role = role;
        
        if(phone){
            this.phone = new Phone(phone);
        }
    };

}