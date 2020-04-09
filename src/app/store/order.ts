export interface Order {
    id: number;
    restaurantId: number;
    totalCost: number;
    deliveryFee: number;
    paymentType: string;
    location: string;
    orderTime: Date;
    deliveryTime: Date;
}
