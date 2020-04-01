import { User } from "../user";

export interface Customer extends User{
  creditCardNumber: string;
  rewardPoints: number;
  recentPlaces: string[];
}
