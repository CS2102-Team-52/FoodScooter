import { User } from "../user";

export interface Customer extends User{
  id: number;
  creditCardNumber: string;
  rewardPoints: number;
  recentPlaces: string[];
}
