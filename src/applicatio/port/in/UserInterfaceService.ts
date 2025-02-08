import { UserDTO } from "../../dto/UserDTO";

export interface CreateUserUseCase {
    execute(userDTO: UserDTO): Promise<UserDTO>
}

export interface GetUserById{
    execute(id: string): Promise<UserDTO>
}