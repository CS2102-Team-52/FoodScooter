import { UserType } from "../../store/user-type.enum";

export interface LoginResponse {
  isAuthenticated: boolean;
  userType: UserType;
  userId: number;
}
