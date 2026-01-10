"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types/product";
import { IconCancel, IconCurrencyDollar, IconInfoTriangleFilled, IconPackage } from "@tabler/icons-react";

export default function InventoryStats() {
  const products: Product[] = [
    { currentStock: 650, status: "In-stock" },
    { currentStock: 520, status: "In-stock" },
    { currentStock: 85, status: "Low-stock" },
    { currentStock: 380, status: "In-stock" },
    { currentStock: 95, status: "Low-stock" },
  ] as Product[];

  const totalStock = products.reduce((sum, p) => sum + p.currentStock, 0);
  const lowStockCount = products.filter((p) => p.status === "Low-stock").length;
  const outOfStockCount = products.filter(
    (p) => p.status === "Out-of-stock"
  ).length;
  const totalValue = "$14.8M";

  return (
    <div className="grid grid-cols-4 gap-4 mb-6 mx-16">
      <Card className="max-w-72">
        <CardContent className="p-2 pl-8">
          <div className="flex-row items-start justify-between">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-1">
              <IconPackage className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">{totalStock} MT</p>
              <p className="text-sm text-gray-600">Total Stock Available</p>
            </div>
            
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-72">
        <CardContent className="p-2 pl-8">
          <div className="flex-row items-start justify-between">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-1">
              <IconInfoTriangleFilled className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">{lowStockCount}</p>
              <p className="text-sm text-gray-600">Low Stock Products</p>
            </div>
            
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-72">
        <CardContent className="p-2 pl-8">
          <div className="flex-row items-start justify-between">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-1">
              <IconCancel className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">{outOfStockCount}</p>
              <p className="text-sm text-gray-600">Out of Stock</p>
            </div>
            
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-72">
        <CardContent className="p-2 pl-8">
          <div className="flex-row items-start justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
              <IconCurrencyDollar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">{totalValue}</p>
              <p className="text-sm text-gray-600">Total Stock Value</p>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
