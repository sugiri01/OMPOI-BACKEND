"use client";

import React, { useState } from "react";
import OrdersHeader from "./_components/OrdersHeader";
import OrdersStats from "./_components/OrdersStatus";
import OrdersFilters from "./_components/OrdersFilters";
import OrdersTable from "./_components/OrdersTable";

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
          <OrdersHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="mx-auto px-4 sm:px-6 md:px-8 py-2 space-y-8">
        <div>
          <OrdersStats />
        </div>

        <div>
          <OrdersFilters activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

          <OrdersTable activeTab={activeTab} />
      </main>
    </div>
  );
};

export default OrdersPage;
