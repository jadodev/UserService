import { User } from './User';
import { UserRole } from '../enum/UserRole';
import { Phone } from '../valueObjects/Phone';

export class Customer extends User {

  constructor(id: string, identification:number, name: string, phone?: Phone) {
    super(id, identification, name, UserRole.CUSTOMER, phone!);
  }
}
