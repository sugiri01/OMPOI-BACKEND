"use client";

import React from "react";

const tabs = [
  "Overview",
  "Order Reports",
  "Inventory Reports",
  "Finance Reports",
  "Saved",
];

export default function ReportsTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-2 font-medium ${
            activeTab === tab
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
