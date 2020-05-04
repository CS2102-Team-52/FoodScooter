import { PromotionType } from './promotion-type';

export interface Promotion {
  id: number,
  startDate: Date,
  endDate: Date,
  type: PromotionType,
  discount: number
}
