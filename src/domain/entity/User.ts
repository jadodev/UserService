import { UserRole } from "../enum/UserRole";
import { DriverStateVO } from "../valueObjects/DriverStateVO";
import { Phone } from "../valueObjects/Phone";

export class User {
    private readonly id: string;
    private readonly name: string;
    private readonly role: UserRole;
    private readonly phone?: Phone;
    private readonly state?: DriverStateVO;

    constructor(id: string, name: string, role: UserRole, phone: Phone, state?: DriverStateVO) {
        this.id = id;
        this.name = name;
        this.role = role;

        if (phone) {
            this.phone = phone; 
        }

        if (role === UserRole.DRIVER && state) {
            this.state = state;
        } else if (role === UserRole.DRIVER && !state) {
            throw new Error("El conductor debe tener un estado");
        }
    }

    public getRole(): UserRole {
        return this.role;
    }

    public getState(): DriverStateVO | undefined {
        return this.state;
    }

    public getPhone(): string | undefined {
        return this.phone?.getValue();
    }

    public getName(): string {
        return this.name;
    }
}
