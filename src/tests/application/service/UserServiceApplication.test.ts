import { UserInterfacePortOut } from '../../../domain/port/out/UserInterfacePortOut';
import { UserDTO } from '../../../applicatio/dto/UserDTO';
import { UserMapper } from '../../../applicatio/mapper/UserMapper'; 
import { UserServiceApplication } from '../../../applicatio/service/UserServiceApplication';
import { UserInterfacePortIn } from '../../../domain/port/in/UserInterfacePortIn';
import { UserRole } from '../../../domain/enum/UserRole';

const mockUserPortIn: jest.Mocked<UserInterfacePortIn> = {
  create: jest.fn(),
  getById: jest.fn(),
};

const mockUserPortOut: jest.Mocked<UserInterfacePortOut> = {
  save: jest.fn(),
  getById: jest.fn(),
};

describe('UserServiceApplication', () => {
  let userService: UserServiceApplication;

  beforeEach(() => {
    userService = new UserServiceApplication(mockUserPortIn, mockUserPortOut);
  });

  describe('execute', () => {
    it('should correctly create and return a user', async () => {
      const userDTO = new UserDTO('1', 'John Doe', UserRole.CUSTOMER, '1234567890');
      const createdUserEntity = UserMapper.toEntity(userDTO);

      mockUserPortIn.create.mockResolvedValueOnce(createdUserEntity);

      const result = await userService.execute(userDTO);

      expect(mockUserPortIn.create).toHaveBeenCalledWith(createdUserEntity);
      expect(result).toEqual(userDTO);
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const userDTO = new UserDTO(userId, 'John Doe', UserRole.CUSTOMER, '1234567890');
      const userEntity = UserMapper.toEntity(userDTO);

      mockUserPortOut.getById.mockResolvedValueOnce(userEntity);

      const result = await userService.findById(userId);

      expect(mockUserPortOut.getById).toHaveBeenCalledWith(userId); 
      expect(result).toEqual(userDTO); 
    });

    it('should throw an error if user is not found', async () => {
      const userId = '1';

      mockUserPortOut.getById.mockResolvedValueOnce(null);

      await expect(userService.findById(userId)).rejects.toThrow(`User with ID ${userId} not found`);
    });
  });
});
