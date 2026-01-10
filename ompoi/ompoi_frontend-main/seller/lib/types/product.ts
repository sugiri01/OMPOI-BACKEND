export interface Product {
  id: string;
  name: string;
  grade: string;
  origin: string;
  weight: string;
  packaging: string;
  currentStock: number;
  reserved: number;
  available: number;
  location: string;
  value: string;
  pricePerKg: string;
  status: 'In-stock' | 'Low-stock' | 'Out-of-stock';
  activeOrders: number;
  image: string;
}