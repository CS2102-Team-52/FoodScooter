import { Promotion } from '../../../../promotions/promotion';
import { PaymentType } from '../../../../store/payment-type.enum';

export interface CustomerOrderOptions {
  rewardPoints: number,
  availablePromotions: Promotion[],
  paymentTypes: PaymentType[],
  recentDeliveryLocations: string[],
}
