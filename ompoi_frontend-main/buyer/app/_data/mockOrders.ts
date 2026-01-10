import { Order } from "@/lib/types/order";
import { STATUS_COLORS, ORDER_STATUSES } from "@/lib/constants";

export const mockOrders: Order[] = [
  {
    id: "ORD123456",
    itemName: "Raw Cashew Nuts",
    quantity: 1000,
    origin: "Vietnam",
    traderName: "Global Cashew Traders",
    price: 5000,
    orderDate: "2024-06-01",
    ExpectedDelivery: "2024-06-15",
    port: "Ho Chi Minh City",
    status: "Processing",
    quality: "Premium A+ Grade"
  },
  {
    id: "ORD123457",
    itemName: "Roasted Cashew Nuts",
    quantity: 500,
    origin: "India",
    traderName: "Spice Cashew Exports",
    price: 3000,
    orderDate: "2024-05-25",
    ExpectedDelivery: "2024-06-10",
    port: "Mumbai",
    status: "Shipped",
    quality: "Premium A+"
  },
  {
    id: "ORD123458",
    itemName: "Salted   Cashew Nuts",
    quantity: 750,
    origin: "Brazil",
    traderName: "Amazon Nut Suppliers",
    price: 4000,
    orderDate: "2024-05-30",
    ExpectedDelivery: "2024-06-20",
    port: "Santos",
    status: "Pending Payment",
    quality: "Grade A"
  },
  {
    id: "ORD123459",
    itemName: "Cashew Butter",
    quantity: 200,
    origin: "USA",
    traderName: "NutriFoods Inc.",
    price: 2500,
    orderDate: "2024-06-05",
    ExpectedDelivery: "2024-06-25",
    port: "Los Angeles",
    status: "Delivered",
    quality: "Premium"
  },
  {
    id: "ORD123460",
    itemName: "RCN W320",
    quantity: 150,
    origin: "Ghana",
    traderName: "OMPOI Cashew Exports.",
    price: 2700,
    orderDate: "2024-06-05",
    ExpectedDelivery: "2024-06-25",
    port: "Kochi Port",
    status: "Delivered",
    quality: "Grade A+"
  },
];

export function getStatusClasses(status: Order['status']) {
  return STATUS_COLORS[status] || 'text-gray-800 bg-gray-100';
}