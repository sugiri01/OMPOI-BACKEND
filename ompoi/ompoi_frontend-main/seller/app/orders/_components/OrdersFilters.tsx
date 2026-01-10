"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { IconCopyPlus, IconFilter, IconSearch } from "@tabler/icons-react";

interface OrdersFiltersProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const OrdersFilters: React.FC<OrdersFiltersProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { key: "all", label: "All Orders" },
    { key: "new", label: "New Orders (2)" },
    { key: "processing", label: "Processing (3)" },
    { key: "shipped", label: "Shipped (1)" },
    { key: "delivered", label: "Delivered (2)" },
    { key: "cancelled", label: "Cancelled (1)" },
  ];

  return (
    <div>
      <Card className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-4 mb-6">
  <div className="flex flex-col md:flex-row items-center justify-between gap-3">
    <div className="relative flex-1 w-full max-w-3xl">
      <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search by Order ID, Buyer, or Product name..."
        className="pl-9 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700 bg-gray-50"
      />
    </div>

    <div className="flex gap-2 w-full md:w-auto justify-end">
      <Button
        variant="outline"
        className="border border-green-500 text-green-600 hover:bg-green-50 font-medium"
      >
        <IconFilter className="w-4 h-4 mr-2" /> All Filters
      </Button>
      <Button className="bg-green-600 hover:bg-green-700 text-white font-medium">
        <IconCopyPlus/> New Order
      </Button>
    </div>
  </div>
</Card>

      <main>
        <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OrdersFilters;
