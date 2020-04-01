import { User } from "../user";

export interface Customer extends User{
  id: number;
  creditCardNumber: number;
  rewardPoints: number;
  recentPlaces: string[];
}
