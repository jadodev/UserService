import { User } from "../../domain/entity/User";
import { UserRole } from "../../domain/enum/UserRole";
import { Phone } from "../../domain/valueObjects/Phone";
import { UserDTO } from "../dto/UserDTO"; 

export class UserMapper {
    public static toUserDTO(user: User): UserDTO {
        return new UserDTO(
          user.identification,
          user.name,
          user.role,
          user.getPhone(),
        );
    }

    public static toEntity(userDTO: UserDTO): User {
        const phone = userDTO.phone ? new Phone(userDTO.phone) : new Phone('');
        const role = userDTO.role as UserRole;
      
        return new User(
          userDTO.id,
          userDTO.identification,
          userDTO.name,
          role,
          phone
        );
      }
}


