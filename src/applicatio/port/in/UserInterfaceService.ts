import { UserDTO } from "../../dto/UserDTO";

export interface CreateUserUseCase {
    execute(userDTO: UserDTO): Promise<UserDTO>
}

export interface GetUserById{
    findById(id: string): Promise<UserDTO>
}