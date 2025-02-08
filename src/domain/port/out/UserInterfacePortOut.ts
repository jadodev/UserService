import { User } from "../../entity/User";

export interface UserInterfacePortOut {
    save( user: User ): Promise<User>;
}