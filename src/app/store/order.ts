export interface Order {
    id: number;
    customerId: number;
    riderId: number;
    restaurantId: number;

    foodCost: number;
    deliveryFee: number;
    rewardPointsUsed: number;
    paymentType: string;

    deliveryLocation: string;

    orderTime: Date;
    departureTime: Date;
    restaurantArrivalTime: Date;
    restaurantDepartureTime: Date;
    deliveryTime: Date;
}
