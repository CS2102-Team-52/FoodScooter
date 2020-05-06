import { PromotionType } from './promotion-type';

export interface Promotion {
  id: number,
  name: string,
  startDate: Date,
  endDate: Date,
  type: PromotionType,
  discount: number
}
