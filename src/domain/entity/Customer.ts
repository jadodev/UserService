import { User } from './User';
import { UserRole } from '../enum/UserRole';
import { Phone } from '../valueObjects/Phone';

export class Customer extends User {

  constructor(id: string, name: string, phone?: Phone) {
    super(id, name, UserRole.CUSTOMER, phone!);
  }
}
