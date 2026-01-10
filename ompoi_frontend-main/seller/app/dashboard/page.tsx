"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Components
import DashboardHeader from "./_components/DashboardHeader";
import SalesOverview from "./_components/SalesOverview";
import RecentOrders from "./_components/RecentOrders";
import TopProducts from "./_components/TopProducts";
import QuickActions from "./_components/QuickActions";
import PerformanceMetrics from "./_components/PerformanceMetrics";
import Notifications from "./_components/Notifications";
import DashboardAlert from "./_components/DashboardAlert";
import StatsGrid from "./_components/StatsGrid";
import { IconCopyPlus, IconFileDescription } from "@tabler/icons-react";

export default function OMPOIDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="px-4 md:px-8 py-6">
        <div className="max-w-[1800px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Welcome back, OMPOI Exports! 👋
      </h1>
      <p className="text-gray-600 text-sm md:text-base">
        {formattedDate} • Here's what's happening with your store today
      </p>
    </div>

            <div className="flex gap-3 flex-wrap">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
                <IconFileDescription className="w-4 h-4" /> View Reports
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700">
                <IconCopyPlus className="w-4 h-4" /> Add New Product
              </button>
            </div>
          </div>

          <DashboardAlert />

          <StatsGrid />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SalesOverview />
              <RecentOrders />
              <TopProducts />
            </div>

            <div className="space-y-6">
              <QuickActions />
              <PerformanceMetrics />
              <Notifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
