export interface Order {
    id: string;
    itemName: string;
    quantity: number;
    quality: string;
    origin: string;
    traderName: string;
    price: number;
    orderDate: string;
    ExpectedDelivery: string;
    port: string;
    status: 'Pending Payment' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Processing';
}