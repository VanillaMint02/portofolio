import { UserRole } from '../utils/user.role';

export interface User {
  id?: string;
  email: string;
  password: string;
  role?: UserRole;
}
