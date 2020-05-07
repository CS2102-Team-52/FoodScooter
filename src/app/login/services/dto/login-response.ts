import { UserType } from "../../../store/user-type.enum";

export interface LoginResponse {
  userType: UserType;
  userId: number;
}
