import { Driver } from "../entity/Driver";
import { Customer } from "../entity/Customer";
import { UserRole } from "../enum/UserRole";
import { DriverState } from "../enum/DriverState";
import { DriverStateVO } from "../valueObjects/DriverStateVO"; 
import { User } from "../entity/User";
import { Phone } from "../valueObjects/Phone";

export class UserBuilder {
  private id: string = '';
  private name: string = '';
  private role: UserRole = UserRole.CUSTOMER;
  private phone?: Phone;
  private state?: DriverStateVO;

  setId(id: string): this {
    this.id = id;
    return this;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setPhone(phone: Phone): this {
    this.phone = phone;
    return this;
  }

  setRole(role: UserRole): this {
    this.role = role;
    return this;
  }

  setDriverState(state: DriverState): this {
    if (this.role !== UserRole.DRIVER) {
      throw new Error('No se puede asignar estado de Driver si el usuario no es un conductor');
    }
    this.state = new DriverStateVO(state);
    return this;
  }

  build(): User {
    if (this.role === UserRole.DRIVER) {
      if (!this.state) {
        throw new Error('El conductor debe tener un estado');
      }

      return new Driver(this.id, this.name, this.state, this.phone!);

    } else if (this.role === UserRole.CUSTOMER) {
      
        return new Customer(this.id, this.name, this.phone!);
    
    } else {
    
        throw new Error('Rol de usuario no soportado');
    }
  }
}
