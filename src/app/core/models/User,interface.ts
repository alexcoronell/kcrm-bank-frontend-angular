import { Base } from './Base.interface';
import { Role } from './Role.interface';

export interface User extends Base {
  email: string;
  password: string;
  role: Role;
}
