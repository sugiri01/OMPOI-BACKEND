"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconChartBarPopular, IconFileDescriptionFilled, IconMessage, IconPackage } from "@tabler/icons-react";

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
      <h3 className="text-xl font-bold mb-2">Quick Actions</h3>

      <button
        onClick={() => router.push("/orders")}
        className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
      >
        <IconPackage className="w-5 h-5 text-orange-500" />
        <div className="text-left">
          <div className="font-semibold text-sm">Process Orders</div>
          <div className="text-xs text-gray-600">8 pending orders</div>
        </div>
      </button>

      <button
        onClick={() => router.push("/inventory")}
        className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
      >
        <IconChartBarPopular className="w-5 h-5 text-blue-500" />
        <div className="text-left">
          <div className="font-semibold text-sm">Update Inventory</div>
          <div className="text-xs text-gray-600">Stock management</div>
        </div>
      </button>

      <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
        <IconMessage className="w-5 h-5 text-purple-500" />
        <div className="text-left">
          <div className="font-semibold text-sm">Messages</div>
          <div className="text-xs text-gray-600">3 unread inquiries</div>
        </div>
      </button>

      <button
        onClick={() => router.push("/reports")}
        className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
      >
        <IconFileDescriptionFilled className="w-5 h-5 text-gray-500" />
        <div className="text-left">
          <div className="font-semibold text-sm">Generate Reports</div>
          <div className="text-xs text-gray-600">Analytics & insights</div>
        </div>
      </button>
    </div>
  );
}
