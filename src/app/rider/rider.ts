import { User } from '../users/user';
import { RiderType } from "../store/rider-type.enum";

export interface Rider extends User {
  //id: number;
  riderType: RiderType;
}
