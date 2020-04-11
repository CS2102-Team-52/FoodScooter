export interface Order {
    id: number;
    restaurantId: number;
    foodCost: number;
    deliveryFee: number;
    paymentType: string;
    location: string;
    orderTime: Date;
    deliveryTime: Date;
}
