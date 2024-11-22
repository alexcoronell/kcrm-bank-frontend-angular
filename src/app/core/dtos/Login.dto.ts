import { User } from '../models/User,interface';

export interface LoginDto
  extends Omit<
    User,
    'id' | 'name' | 'createAt' | 'updateAt' | 'active' | 'deleted' | 'role'
  > {}
