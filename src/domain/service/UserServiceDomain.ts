import { UserBuilder } from "../builder/UserBuilder";
import { User } from "../entity/User";
import { UserInterfacePortIn } from "../port/in/UserInterfacePortIn";
import { UserInterfacePortOut } from "../port/out/UserInterfacePortOut";

export class UserServiceDomain implements UserInterfacePortIn{
    private readonly userRepository: UserInterfacePortOut;
    private readonly builder: UserBuilder;
    
    constructor(userRepository: UserInterfacePortOut){
        this.userRepository = userRepository;
        this.builder = new UserBuilder();
    };

    async create( user: User ): Promise<User> {
        return await this.userRepository.save(user);
    }

    async getById(id: string): Promise<User | null> {
        return await this.userRepository.getById(id);
    }
    
}