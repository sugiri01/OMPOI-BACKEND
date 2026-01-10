"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconBell, IconCancel, IconCircleCheck, IconFileText, IconPackage, IconTruck } from "@tabler/icons-react";


interface OrdersTableProps {
  activeTab: string;
}

interface Order {
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
  status: string;
  image: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ activeTab }) => {
  const orders: Order[] = [
    {
      id: "#OMP-20251012-7890",
      date: "Oct 28, 2025",
      buyer: "Global Corp",
      product: "Raw Cashew Nuts - W240 Grade",
      origin: "Cote d'Ivoire",
      weight: "180/kg",
      packaging: "50 LBS OT",
      quantity: "120 MT",
      pricePerKg: "$7.95/kg",
      totalValue: "$954,000",
      status: "processing",
      image: "/product/raw.webp",
    },
    {
      id: "#OMP-20251012-7891",
      date: "Oct 29, 2025",
      buyer: "TradeLink Inc",
      product: "Raw Cashew Nuts - W240 Grade",
      origin: "Ghana Origin",
      weight: "190/kg",
      packaging: "47 LBS OT",
      quantity: "180 MT",
      pricePerKg: "$8.10/kg",
      totalValue: "$1,458,000",
      status: "new",
      image: "/product/rcn.w240.webp",
    },
    {
      id: "#OMP-20251011-7880",
      date: "Oct 31, 2025",
      buyer: "Asia Imports",
      product: "Raw Cashew Nuts - W240 Grade",
      origin: "India Origin",
      weight: "200/kg",
      packaging: "45 LBS OT",
      quantity: "150 MT",
      pricePerKg: "$8.00/kg",
      totalValue: "$1,200,000",
      status: "new",
      image: "/product/rcn.w240.webp",
    },
    {
      id: "#OMP-20251010-7871",
      date: "Oct 30, 2025",
      buyer: "EuroTrade Co",
      product: "Raw Cashew Nuts - W240 Grade",
      origin: "Nigeria Origin",
      weight: "185/kg",
      packaging: "48 LBS OT",
      quantity: "200 MT",
      pricePerKg: "$8.30/kg",
      totalValue: "$1,660,000",
      status: "processing",
      image: "/product/rcn.w240.webp",
    },
    {
      id: "#OMP-20251009-7860",
      date: "Oct 29, 2025",
      buyer: "AgriHub SA",
      product: "Raw Cashew Nuts - W240 Grade",
      origin: "Tanzania Origin",
      weight: "195/kg",
      packaging: "46 LBS OT",
      quantity: "110 MT",
      pricePerKg: "$8.25/kg",
      totalValue: "$907,500",
      status: "processing",
      image: "/product/rcn.webp",
    },
    {
      id: "#OMP-20251001-7650",
      date: "Nov 1, 2025",
      buyer: "North Star Co",
      product: "Raw Cashew Nuts - W240 Grade",
      origin: "Cote d'Ivoire",
      weight: "180/kg",
      packaging: "50 LBS OT",
      quantity: "95 MT",
      pricePerKg: "$7.95/kg",
      totalValue: "$755,250",
      status: "shipped",
      image: "/product/raw.webp",
    },
    {
      id: "#OMP-20250920-5541",
      date: "Sep 20, 2025",
      buyer: "AgroFuture Ltd",
      product: "Raw Cashew Nuts - W320 Grade",
      origin: "Tanzania Origin",
      weight: "195/kg",
      packaging: "46 LBS OT",
      quantity: "65 MT",
      pricePerKg: "$8.25/kg",
      totalValue: "$536,250",
      status: "delivered",
      image: "/product/rcn.webp",
    },
    {
      id: "#OMP-20250915-5420",
      date: "Sep 10, 2025",
      buyer: "Global Corp",
      product: "Raw Cashew Nuts - W320 Grade",
      origin: "Ghana Origin",
      weight: "190/kg",
      packaging: "47 LBS OT",
      quantity: "140 MT",
      pricePerKg: "$8.10/kg",
      totalValue: "$1,134,000",
      status: "delivered",
      image: "/product/rcn.webp",
    },
    {
      id: "#OMP-20251004-7799",
      date: "Oct 4, 2025",
      buyer: "Delta Trade",
      product: "Raw Cashew Nuts - W240 Grade",
      origin: "Brazil Origin",
      weight: "220/kg",
      packaging: "60 KG bags",
      quantity: "30 MT",
      pricePerKg: "$12.50/kg",
      totalValue: "$375,000",
      status: "cancelled",
      image: "/product/rcn.w240.webp",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      new: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      processing: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
      shipped: "bg-purple-100 text-purple-700 hover:bg-purple-200",
      delivered: "bg-green-100 text-green-700 hover:bg-green-200",
      cancelled: "bg-red-100 text-red-700 hover:bg-red-200",
    };

    const icons = {
      new: <IconBell className="w-3 h-3 mr-1" />,
      processing: <IconPackage className="w-3 h-3 mr-1" />,
      shipped: <IconTruck className="w-3 h-3 mr-1" />,
      delivered: <IconCircleCheck className="w-3 h-3 mr-1" />,
      cancelled: <IconCancel className="w-3 h-3 mr-1" />,
    };

    return (
      <Badge
        className={`${styles[status as keyof typeof styles]} flex items-center transition duration-200`}
      >
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getAlertForTab = (tab: string) => {
    const alerts = {
      all: null,
      new: (
        <Alert className="bg-blue-50 border-blue-200 mb-4">
          <IconBell className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            You have <b>2 new orders</b> awaiting approval.
          </AlertDescription>
        </Alert>
      ),
      processing: (
        <Alert className="bg-yellow-50 border-yellow-200 mb-4">
          <IconPackage className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            You have <b>3 orders</b> in processing stage.
          </AlertDescription>
        </Alert>
      ),
      shipped: (
        <Alert className="bg-purple-50 border-purple-200 mb-4">
          <IconTruck className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-600">
            1 active shipment in progress.
          </AlertDescription>
        </Alert>
      ),
      delivered: (
        <Alert className="bg-green-50 border-green-200 mb-4">
          <IconCircleCheck className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            2 orders successfully delivered.
          </AlertDescription>
        </Alert>
      ),
      cancelled: (
        <Alert className="bg-red-50 border-red-200 mb-4">
          <IconCancel className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            1 order recently cancelled.
          </AlertDescription>
        </Alert>
      ),
    };
    return alerts[tab as keyof typeof alerts];
  };

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <div>
  {getAlertForTab(activeTab)}

  <div className="space-y-4 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
  {filteredOrders.map((order) => (
    <Card
      key={order.id}
      className="rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all duration-200"
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-800">{order.id}</span>
            <span>•</span>
            <span>{order.date}</span>
            <span>•</span>
            <span>
              Buyer:{" "}
              <span className="font-medium text-gray-800">{order.buyer}</span>
            </span>
          </div>
          {getStatusBadge(order.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_auto] items-center gap-6">
          <div className="flex items-center gap-4">
            <img
              src={order.image}
              alt={order.product}
              className="w-16 h-16 rounded-md object-cover border border-gray-200"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                {order.product}
              </h3>
              <p className="text-gray-600 text-sm">
                {order.origin} • {order.weight} • {order.packaging}
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-10 text-sm">
            <div className="text-center">
              <p className="text-gray-500">Quantity</p>
              <p className="font-semibold text-gray-800">{order.quantity}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Price</p>
              <p className="font-semibold text-gray-800">{order.pricePerKg}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Total</p>
              <p className="font-semibold text-green-600">{order.totalValue}</p>
            </div>
          </div>

          <div className="flex justify-end items-center gap-2">
            {order.status === "new" && (
              <>
                <Button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md px-4 py-1.5">
                  Approve Order
                </Button>
                <Button
                  variant="outline"
                  className="text-sm font-medium border border-gray-300 text-gray-700 rounded-md px-4 py-1.5 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </>
            )}

            {order.status === "processing" && (
              <>
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center text-sm font-medium rounded-md px-4 py-1.5">
                  <IconTruck className="w-4 h-4 mr-2" /> Mark as Shipped
                </Button>
                <Button
                  variant="outline"
                  className="text-sm font-medium border border-gray-300 text-gray-700 rounded-md px-4 py-1.5 hover:bg-gray-50"
                >
                  Update Status
                </Button>
              </>
            )}

            {order.status === "delivered" && (
              <>
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center text-sm font-medium rounded-md px-4 py-1.5">
                  <IconFileText className="w-4 h-4 mr-2" /> Generate Invoice
                </Button>
                <Button
                  variant="outline"
                  className="text-sm font-medium border border-gray-300 text-gray-700 rounded-md px-4 py-1.5 hover:bg-gray-50"
                >
                  View Details
                </Button>
              </>
            )}

            {order.status === "shipped" && (
              <>
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center text-sm font-medium rounded-md px-4 py-1.5">
                  <IconFileText className="w-4 h-4 mr-2" /> Track Shipment
                </Button>
                <Button
                  variant="outline"
                  className="text-sm font-medium border border-gray-300 text-gray-700 rounded-md px-4 py-1.5 hover:bg-gray-50"
                >
                  Update Status
                </Button>
              </>
            )}

            {order.status === "cancelled" && (
              <>
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center text-sm font-medium rounded-md px-4 py-1.5">
                  <IconFileText className="w-4 h-4 mr-2" /> View Details
                </Button>
                <Button
                  variant="outline"
                  className="text-sm font-medium border border-gray-300 text-gray-700 rounded-md px-4 py-1.5 hover:bg-gray-50"
                >
                  Download Report
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

</div>


  );
};

export default OrdersTable;
