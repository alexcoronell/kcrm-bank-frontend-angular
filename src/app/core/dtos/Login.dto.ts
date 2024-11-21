import { User } from '../models/User,interface';

export interface LoginDto
  extends Omit<
    User,
    'id' | 'createAt' | 'updateAt' | 'active' | 'deleted' | 'role'
  > {}
