import { UserProfile } from '../../store/user-profile';

export interface CustomerProfile extends UserProfile {
  username: string,
  password: string,
  creditCardNumber: string,
  rewardPoints: number,
  recentDeliveryLocations: string[];
}
