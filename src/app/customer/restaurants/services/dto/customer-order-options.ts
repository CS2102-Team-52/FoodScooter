import { Promotion } from '../../../../promotions/promotion';

export interface CustomerOrderOptions {
  rewardPoints: number,
  recentDeliveryLocations: string[],
  availablePromotions: Promotion[]
}
