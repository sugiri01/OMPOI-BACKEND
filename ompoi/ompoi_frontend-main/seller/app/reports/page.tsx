"use client";

import React, { useState } from "react";
import ReportsHeader from "./_components/ReportsHeader";
import ReportsTabs from "./_components/ReportsTabs";
import ReportsOverview from "./_components/ReportsOverview";
import OrderReports from "./_components/OrderReports";
import InventoryReports from "./_components/InventoryReports";
import FinanceReports from "./_components/FinanceReports";
import SavedReports from "./_components/SavedReports";
import ReportsStats from "./_components/ReportsStats";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <ReportsHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <ReportsStats />
      <main className="px-4 py-6 md:px-6 md:py-8 space-y-6">
        <ReportsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Overview" && <ReportsOverview />}
        {activeTab === "Order Reports" && <OrderReports />}
        {activeTab === "Inventory Reports" && <InventoryReports />}
        {activeTab === "Finance Reports" && <FinanceReports />}
        {activeTab === "Saved" && <SavedReports />}
      </main>
    </div>
  );
};

export default ReportsPage;
