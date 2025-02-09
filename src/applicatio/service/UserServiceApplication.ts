import { UserInterfacePortIn } from "../../domain/port/in/UserInterfacePortIn";
import { UserInterfacePortOut } from "../../domain/port/out/UserInterfacePortOut";
import { UserDTO } from "../dto/UserDTO";
import { UserMapper } from "../mapper/UserMapper";
import { CreateUserUseCase, GetUserById } from "../port/in/UserInterfaceService";

export class UserServiceApplication implements CreateUserUseCase, GetUserById {
    private userPortIn: UserInterfacePortIn;
    private userPortOut: UserInterfacePortOut;

    constructor(userPortIn: UserInterfacePortIn, userPortOut: UserInterfacePortOut){
        this.userPortIn = userPortIn;
        this.userPortOut = userPortOut;
    }

    
    async execute(userDTO: UserDTO): Promise<UserDTO> {
        const userEntity = UserMapper.toEntity(userDTO);
        const createdUser = await this.userPortIn.create(userEntity);
        return UserMapper.toUserDTO(createdUser);
    }

    async findById(id: string): Promise<UserDTO> {
        const user = await this.userPortOut.getById(id);
    
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
    
        return UserMapper.toUserDTO(user);
    }
}