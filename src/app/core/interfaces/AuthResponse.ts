import type { CurrentUser } from './CurrentUser.interface';

export interface AuthResponse {
  message: string;
  isAdmin: boolean;
  user: CurrentUser;
}
