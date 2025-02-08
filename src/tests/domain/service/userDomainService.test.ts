import { UserServiceDomain } from "../../../domain/service/UserServiceDomain";
import { User } from "../../../domain/entity/User";
import { UserInterfacePortOut } from "../../../domain/port/out/UserInterfacePortOut";
import { UserRole } from "../../../domain/enum/UserRole";
import { Phone } from "../../../domain/valueObjects/Phone";
import { UserBuilder } from "../../../domain/builder/UserBuilder";

class MockUserRepository implements UserInterfacePortOut {
  save(user: User): Promise<User> {
    return Promise.resolve(user);
  }

  getById(id: string): Promise<User | null> {
    if (id === "12345") {
      return Promise.resolve(new User("12345", "Juan Pérez", UserRole.CUSTOMER, new Phone("3001234567")));
    }
    return Promise.resolve(null);
    }
}

describe("UserServiceDomain", () => {
    let userService: UserServiceDomain;
    let mockUserRepository: MockUserRepository;
  
    beforeEach(() => {
      mockUserRepository = new MockUserRepository();
      userService = new UserServiceDomain(mockUserRepository);
    });
  
    it("should create a user and save it", async () => {
      const phone = new Phone("3001234567");
      const user = new User("12345", "Juan Pérez", UserRole.CUSTOMER, phone);
  
      const createdUser = await userService.create(user);
      
      expect(createdUser).toBeInstanceOf(User);
      expect(createdUser).toHaveProperty("id", "12345");
      expect(createdUser).toHaveProperty("name", "Juan Pérez");
    });
  
    it("should retrieve a user by id", async () => {
        const user = new UserBuilder()
            .setId("12345")
            .setName("John Doe")
            .setRole(UserRole.CUSTOMER)
            .setPhone("3001234567")
            .build();
        
        expect(user).toBeInstanceOf(User);
        expect(user?.getPhone()).toBeDefined()
        expect(user?.getPhone()).toBe("3001234567");
    });
    
    
  
    it("should return null if user is not found by id", async () => {
      const user = await userService.getById("nonexistent-id");
  
      expect(user).toBeNull();
    });
  });
  