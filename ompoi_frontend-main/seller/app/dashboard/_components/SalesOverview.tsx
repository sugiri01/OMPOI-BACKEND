"use client";

import { IconChartBar, IconChartBarPopular, IconTrendingUp } from "@tabler/icons-react";
import React from "react";

export default function SalesOverview() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Sales Overview</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 rounded-md hover:bg-gray-100">
            7 Days
          </button>
          <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md">
            30 Days
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 rounded-md hover:bg-gray-100">
            90 Days
          </button>
        </div>
      </div>
      <div className="h-48 flex items-center justify-center bg-linear-to-br from-green-50 to-blue-50 rounded-lg">
        <div className="text-center">
          <IconChartBarPopular className="w-16 h-16 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
            <IconTrendingUp/>  Sales Chart: $89.2K revenue across 24 orders this month
          </p>
        </div>
      </div>
    </div>
  );
}
