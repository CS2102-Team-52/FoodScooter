import { Promotion } from "./promotion";

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  minimumPurchase: number;
  promotions: Promotion[];
}
