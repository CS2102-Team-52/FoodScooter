import { UserType } from "../../../store/user-type.enum";
import { RiderType } from "../../../store/rider-type.enum";

export interface AccountDetails {
  username: string;
  password: string;
  userType: UserType;
  riderType: RiderType;
}
