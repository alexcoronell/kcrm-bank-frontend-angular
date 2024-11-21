import { Role } from '../models/Role.interface';

export interface CreateRoleDto
  extends Omit<Role, 'id' | 'createAt' | 'updateAt' | 'active' | 'deleted'> {}

export interface UpdateRoleDto extends CreateRoleDto {
  active: boolean;
}
