import { UserInterfacePortIn } from "../../domain/port/in/UserInterfacePortIn";
import { UserDTO } from "../dto/UserDTO";
import { UserMapper } from "../mapper/UserMapper";
import { ValidationError } from "../../exceptions/ValidationError";
import { NotFoundError } from "../../exceptions/NotFoundError";
import { DatabaseException } from "../../exceptions/DatabaseException";

export class UserApplicationService {
    private readonly userService: UserInterfacePortIn;

    constructor(userService: UserInterfacePortIn) {
        this.userService = userService;
    }

    async execute(userDTO: UserDTO): Promise<UserDTO> {
        if (!userDTO) {
            throw new ValidationError("User data is required.");
        }
        if (!userDTO.identification) {
            throw new ValidationError("User identification is required.");
        }
        if (!userDTO.name) {
            throw new ValidationError("User name is required.");
        }
        if (!userDTO.phone) {
            throw new ValidationError("User phone is required.");
        }
        if (!userDTO.role) {
            throw new ValidationError("User role is required.");
        }

        const existingUserById = await this.userService.getByIdentification(userDTO.identification);
        if (existingUserById) {
            throw new ValidationError(`User with ID ${userDTO.identification} already exists.`);
        }

        try {
            const userEntity = UserMapper.toEntity(userDTO);
            const createdUser = await this.userService.create(userEntity);
            return UserMapper.toUserDTO(createdUser);
        } catch (error) {
            throw new DatabaseException("Error saving user.");
        }
    }

    async findById(id: string): Promise<UserDTO> {
        if (!id) {
            throw new ValidationError("User ID is required.");
        }

        try {
            const user = await this.userService.getById(id);
            if (!user) {
                throw new NotFoundError(`User with ID ${id} not found.`);
            }
            return UserMapper.toUserDTO(user);
        } catch (error) {
            throw new DatabaseException(`Error retrieving user with ID ${id}.`);
        }
    }

    async findByIdentification(identification: number): Promise<UserDTO> {
        if (!identification) {
            throw new ValidationError("User identification is required.");
        }

        try {
            const user = await this.userService.getByIdentification(identification);
            if (!user) {
                throw new NotFoundError(`User with identification ${identification} not found.`);
            }
            return UserMapper.toUserDTO(user);
        } catch (error) {
            throw new DatabaseException(`Error retrieving user with identification ${identification}.`);
        }
    }
}
