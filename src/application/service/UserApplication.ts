import { UserInterfacePortIn } from "../../domain/port/in/UserInterfacePortIn";
import { UserDTO } from "../dto/UserDTO";
import { UserMapper } from "../mapper/UserMapper";

export class UserApplicationService {
    private readonly userService: UserInterfacePortIn;

    constructor(userService: UserInterfacePortIn){
       this.userService = userService;
    }

    
    async execute(userDTO: UserDTO): Promise<UserDTO> {
        const userEntity = UserMapper.toEntity(userDTO);
        const createdUser = await this.userService.create(userEntity);
        return UserMapper.toUserDTO(createdUser);
    }

    async findById(id: string): Promise<UserDTO> {
        const user = await this.userService.getById(id);
    
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
    
        return UserMapper.toUserDTO(user);
    }
}