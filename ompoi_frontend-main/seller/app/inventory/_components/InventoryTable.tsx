"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  AlertTriangle,
  X,
  BarChart3,
  Save,
  Settings,
} from "lucide-react";
import { Product } from "@/lib/types/product";
import Image from "next/image";

interface InventoryTableProps {
  filter: string;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setIsUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InventoryTable({
  filter,
  setSelectedProduct,
  setIsUpdateDialogOpen,
}: InventoryTableProps) {
  const products: Product[] = [
    {
      id: "1",
      name: "Raw Cashew Nuts - W320 Grade",
      grade: "W320",
      origin: "Benin Origin",
      weight: "185/kg",
      packaging: "49 LBS OT",
      currentStock: 650,
      reserved: 150,
      available: 500,
      location: "Tuticorin",
      value: "$5.07M",
      pricePerKg: "$7.80/kg",
      status: "In-stock",
      activeOrders: 5,
      image: "/product/rcn.w240.webp",
    },
    {
      id: "2",
      name: "Raw Cashew Nuts - W240 Grade",
      grade: "W240",
      origin: "Ghana Origin",
      weight: "190/kg",
      packaging: "47 LBS OT",
      currentStock: 520,
      reserved: 200,
      available: 320,
      location: "Mumbai",
      value: "$4.21M",
      pricePerKg: "$8.10/kg",
      status: "In-stock",
      activeOrders: 3,
      image: "/product/rcn.w240.webp",
    },
    {
      id: "3",
      name: "Cashew Kernels - W320 White Wholes",
      grade: "W320",
      origin: "Processed India",
      weight: "320/lb",
      packaging: "Premium Grade",
      currentStock: 85,
      reserved: 50,
      available: 35,
      location: "Kochi",
      value: "$1.06M",
      pricePerKg: "$12.50/kg",
      status: "Low-stock",
      activeOrders: 2,
      image: "/product/rcn.webp",
    },
    {
      id: "4",
      name: "Raw Cashew Nuts - W320 Grade",
      grade: "W320",
      origin: "Tanzania Origin",
      weight: "195/kg",
      packaging: "46 LBS OT",
      currentStock: 380,
      reserved: 100,
      available: 280,
      location: "Chennai",
      value: "$3.14M",
      pricePerKg: "$8.25/kg",
      status: "In-stock",
      activeOrders: 2,
      image: "/product/rcn.webp",
    },
    {
      id: "5",
      name: "Raw Cashew Nuts - W240 Grade",
      grade: "W240",
      origin: "Cote d'Ivoire",
      weight: "180/kg",
      packaging: "50 LBS OT",
      currentStock: 95,
      reserved: 0,
      available: 95,
      location: "Tuticorin",
      value: "$755K",
      pricePerKg: "$7.95/kg",
      status: "Low-stock",
      activeOrders: 0,
      image: "/product/rcn.w240.webp",
    },
  ];

  const filterProductsByTab = (tab: string) => {
    if (tab === "All") return products;
    return products.filter((p) => p.status === tab);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      "In-stock": "bg-green-100 text-green-700 hover:bg-green-100",
      "Low-stock": "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
      "Out-of-stock": "bg-red-100 text-red-700 hover:bg-red-100",
    };

    const icons = {
      "In-stock": <Package className="w-3 h-3 mr-1" />,
      "Low-stock": <AlertTriangle className="w-3 h-3 mr-1" />,
      "Out-of-stock": <X className="w-3 h-3 mr-1" />,
    };

    const labels = {
      "In-stock": "In Stock",
      "Low-stock": "Low Stock",
      "Out-of-stock": "Out of Stock",
    };

    return (
      <Badge
        className={`${styles[status as keyof typeof styles]} flex items-center`}
      >
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getStockColor = (stock?: number): string => {
    if ((stock ?? 0) >= 100) return "text-green-600"; // ✅ Sufficient stock
    return "text-yellow-500"; // ⚠️ Low stock
  };

  function filterProducts(filter: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="space-y-4 ">
      {filterProductsByTab(filter).map(
        (product: {
          id: React.Key | null | undefined;
          image: string;
          name:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          origin:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          weight:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          packaging:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          status: string;
          currentStock:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          location:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          reserved:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          activeOrders:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          available:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          value:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          pricePerKg:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
        }) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl border-2 border-blue-300 relative">
                    <Image
                      src={product.image as string}
                      alt={product.name as string}
                      fill
                      className="w-16 h-16 rounded-md object-cover border border-gray-200"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                      <span>{product.origin}</span>
                      <span>•</span>
                      <span>{product.weight}</span>
                      <span>•</span>
                      <span>{product.packaging}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(product.status)}
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    Current Stock
                  </p>
                  <p
                    className={`text-2xl font-bold ${getStockColor(
                      Number(product.currentStock ?? 0)
                    )}`}
                  >
                    {product.currentStock} MT
                  </p>

                  <p className="text-xs text-gray-600 mt-1">
                    At {product.location}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    Reserved
                  </p>
                  <p className="text-2xl font-bold">{product.reserved} MT</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {product.activeOrders} active{" "}
                    {product.activeOrders === 1 ? "order" : "orders"}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    Available
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {product.available} MT
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {product.status === "low-stock"
                      ? "Below threshold"
                      : "Ready to sell"}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">Value</p>
                  <p className="text-2xl font-bold">{product.value}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    @ {product.pricePerKg}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => setIsUpdateDialogOpen((prev) => !prev)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Stock
                </Button>
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View History
                </Button>
                {product.status === "low-stock" && (
                  <Button
                    variant="outline"
                    className="text-yellow-600 border-yellow-600"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Restock Alert
                  </Button>
                )}
                {product.status === "in-stock" && (
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
