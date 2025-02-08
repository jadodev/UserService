import { User } from "../../domain/entity/User";
import { Phone } from "../../domain/valueObjects/Phone";
import { UserDTO } from "../dto/UserDTO"; 

export class UserMapper {
    public static toUserDTO(user: User): UserDTO {
        return new UserDTO(
          user.id,
          user.name,
          user.role,
          user.getPhone(),
        );
    }

    public static toEntity( userDTO: UserDTO ): User {
        const phone = userDTO.phone ? new Phone(userDTO.phone) : new Phone(''); 

        return new User(
            userDTO.id,
            userDTO.name,
            userDTO.role,
            phone,
        )
    }
}


