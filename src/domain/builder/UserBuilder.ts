import { Driver } from "../entity/Driver";
import { Customer } from "../entity/Customer";
import { UserRole } from "../enum/UserRole";
import { User } from "../entity/User";
import { Phone } from "../valueObjects/Phone";

export class UserBuilder {
  private id: string = '';
  private name: string = '';
  private role: UserRole = UserRole.CUSTOMER;
  private phone?: Phone;

  setId(id: string): this {
    this.id = id;
    return this;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setPhone(phone: string): this {
    this.phone = new Phone(phone);
    return this;
  }

  setRole(role: UserRole): this {
    this.role = role;
    return this;
  }


  build(): User {
    if (this.role === UserRole.DRIVER) {
      return new Driver(this.id, this.name, this.phone!);
    } else if (this.role === UserRole.CUSTOMER) {
      return new Customer(this.id, this.name, this.phone!);
    } else {
      throw new Error('Rol de usuario no soportado');
    }
  }
}

