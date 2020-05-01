import { PaymentType } from "../../../../store/payment-type.enum";

export interface CustomerOrder {
  customerId: number,
  restaurantId: number,
  foodCost: number,
  rewardPointsUsed: number,
  paymentType: PaymentType,
  deliveryLocation: string,
  orderTime: Date,
  foodItems: string[],
  quantity: number[]
}
