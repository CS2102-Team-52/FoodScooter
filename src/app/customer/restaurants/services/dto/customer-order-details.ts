import { PaymentType } from "../../../../store/payment-type.enum";

export interface CustomerOrderDetails {
  customerId: number,
  restaurantId: number,
  totalFoodCost: number,
  paymentType: PaymentType,
  location: string,
  orderTime: Date,
  foodItems: string[],
  quantity: number[]
}
