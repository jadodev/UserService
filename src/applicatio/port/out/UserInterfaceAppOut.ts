import { UserDTO } from "../../dto/UserDTO";

export interface UserInterfaceAppOut {
    save( userDTO:UserDTO ): Promise<UserDTO>;
    findById(id: string): Promise<UserDTO | null>;
}