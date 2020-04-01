import { User } from '../user';
import { RiderType } from "../../store/rider-type.enum";

export interface Rider extends User {
  //id: number;
  //username: string;
  //password: string;
  riderType: RiderType;
}
