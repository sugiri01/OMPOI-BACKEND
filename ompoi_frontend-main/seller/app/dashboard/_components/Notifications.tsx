"use client";

import React from "react";

export default function Notifications() {
  const notifications = [
    {
      title: "Order Delivered",
      desc: "#ORD-8892 successfully delivered",
      time: "2 hours ago",
    },
    {
      title: "Low Stock Alert",
      desc: "RCN W320 stock below 100 MT",
      time: "5 hours ago",
    },
    {
      title: "New Inquiry",
      desc: "Buyer asking about W240 availability",
      time: "1 day ago",
    },
    {
      title: "New Review",
      desc: "5-star rating from Global Traders",
      time: "2 days ago",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <button className="text-sm text-green-600 font-medium hover:underline">
          Mark All Read
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {notifications.map((note, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">
                {note.title}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">{note.desc}</p>
            </div>
            <p className="text-xs text-gray-500 whitespace-nowrap">
              {note.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
