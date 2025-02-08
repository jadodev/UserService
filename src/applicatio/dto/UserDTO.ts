import { UserRole } from "../../domain/enum/UserRole";

export class UserDTO {
    id: string;
    name: string;
    role: UserRole;
    phone: string | undefined;
  
    constructor(id: string, name: string, role: UserRole, phone: string | undefined) {
      this.id = id;
      this.name = name;
      this.role = role;
      this.phone = phone;
    }
  }