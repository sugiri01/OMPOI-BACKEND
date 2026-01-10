"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IconChevronDown, IconChevronUp, IconCurrencyDollar, IconPackage, IconStarFilled, IconTruck, IconTruckDelivery, IconTruckLoading } from "@tabler/icons-react";

const OrdersStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2"><b>TOTAL ORDERS</b></p>
            <p className="text-3xl font-bold mb-1">9</p>
            <p className="text-xs text-gray-500">ALL-TIME TOTAL</p>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-lg flex items-center justify-center">
            <IconPackage className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2"><b>TOTAL REVENUE (LAST 30 DAYS)</b></p>
            <p className="text-3xl font-bold mb-1">$4.8M</p>
            <p className="text-xs text-green-600 flex items-center">
              <IconChevronUp className="w-3 h-3 mr-1" /> +12.5%
            </p>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-100 rounded-lg flex items-center justify-center">
            <IconCurrencyDollar className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2"><b>PENDING SHIPMENTS</b></p>
            <p className="text-3xl font-bold mb-1">5</p>
            <p className="text-xs text-gray-500">NEW + PROCESSING</p>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg flex items-center justify-center">
            <IconTruckDelivery className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2"><b>AVERAGE ORDER VALUE</b></p>
            <p className="text-3xl font-bold mb-1">$854K</p>
            <p className="text-xs text-red-600 flex items-center">
              <IconChevronDown className="w-3 h-3 mr-1" /> -4.2%
            </p>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-lg flex items-center justify-center">
            <IconStarFilled className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersStats;
