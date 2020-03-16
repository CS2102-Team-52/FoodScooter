import { Time } from '@angular/common';

export interface Order {
    oid: number;
    totalCost: number;
    deliveryFee: number;
    paymentType: string;
    location: string;
    orderTime: Time;
    deliveryTime: Time;
}
