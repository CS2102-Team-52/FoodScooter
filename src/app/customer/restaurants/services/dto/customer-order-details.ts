import { PaymentType } from "../../../../store/payment-type.enum";

export interface CustomerOrderDetails {
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
