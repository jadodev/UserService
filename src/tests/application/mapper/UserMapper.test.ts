import { User } from "../../../domain/entity/User";
import { Phone } from "../../../domain/valueObjects/Phone";
import { UserDTO } from "../../../applicatio/dto/UserDTO";
import { UserMapper } from "../../../applicatio/mapper/UserMapper";
import { UserRole } from "../../../domain/enum/UserRole";

describe('UserMapper', () => {
  it('should correctly map a User to UserDTO', () => {
    const phone = new Phone('1234567890');
    const user = new User('1', 'John Doe', UserRole.CUSTOMER , phone);

    const userDTO = UserMapper.toUserDTO(user);

    expect(userDTO).toBeDefined();
    expect(userDTO.id).toBe(user.id);
    expect(userDTO.name).toBe(user.name);
    expect(userDTO.role).toBe(user.role);
    expect(userDTO.phone).toBe(phone.getValue());
  });

  it('should correctly map a UserDTO to User', () => {
    const userDTO = new UserDTO('1', 'John Doe', UserRole.CUSTOMER, '1234567890');

    const user = UserMapper.toEntity(userDTO);

    expect(user).toBeDefined();
    expect(user.id).toBe(userDTO.id);
    expect(user.name).toBe(userDTO.name);
    expect(user.role).toBe(userDTO.role);
    expect(user.getPhone()).toBe(userDTO.phone);
  });
});
