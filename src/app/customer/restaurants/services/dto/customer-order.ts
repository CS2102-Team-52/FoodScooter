import { PaymentType } from "../../../../store/payment-type.enum";

export interface CustomerOrder {
  customerId: number,
  restaurantId: number,
  foodCost: number,
  rewardPointsUsed: number,
  discountApplied: number,
  paymentType: PaymentType,
  deliveryLocation: string,
  orderTime: Date,
  foodItems: number[],
  quantity: number[]
}
