export interface Order {
  id: string;
  date: string;
  buyer: string;
  product: string;
  origin: string;
  weight: string;
  packaging: string;
  quantity: string;
  pricePerKg: string;
  totalValue: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  image: string;
}