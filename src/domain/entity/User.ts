import { UserRole } from "../enum/UserRole";
import { Phone } from "../valueObjects/Phone";

export class User {
    id: string;
    name: string;
    role: UserRole;
    phone?: Phone;

    constructor(id: string, name: string, role: UserRole, phone: Phone) {
        this.id = id;
        this.name = name;
        this.role = role;

        if (phone) {
            this.phone = phone; 
        }

    }

    public getId(): string {
        return this.id;
    }

    public getRole(): UserRole {
        return this.role;
    }

    public getPhone(): string | undefined {
        return this.phone?.getValue();
    }

    public getName(): string {
        return this.name;
    }
}
