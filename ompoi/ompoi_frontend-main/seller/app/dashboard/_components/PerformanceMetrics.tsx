"use client";

import React from "react";

export default function PerformanceMetrics() {
  const metrics = [
    { label: "Order Fulfillment", value: 95 },
    { label: "On-Time Delivery", value: 92 },
    { label: "Customer Satisfaction", value: 96 },
    { label: "Response Rate", value: 88 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-800">Performance</h3>
      </div>

      <div className="p-5 flex flex-col gap-3">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-gray-700 w-1/2">
              {metric.label}
            </span>

            <div className="flex items-center gap-3 w-1/2 justify-end">
              <div className="h-2 w-3/4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {metric.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
