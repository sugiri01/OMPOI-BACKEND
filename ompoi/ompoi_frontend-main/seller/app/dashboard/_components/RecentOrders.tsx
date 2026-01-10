"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecentOrders() {
  const recentOrders = [
    {
      id: "#ORD-2024-8934",
      company: "Global Traders Ltd",
      product: "RCN W320",
      qty: "150 MT",
      amount: "$1,170,000",
      status: "New",
      image: "/rcn.webp",
    },
    {
      id: "#ORD-2024-8935",
      company: "Kerala Premium Foods",
      product: "Kernels W320",
      qty: "50 MT",
      amount: "$625,000",
      status: "New",
      image: "/kernel.webp",
    },
    {
      id: "#ORD-2024-8921",
      company: "Premium Processors",
      product: "RCN W240",
      qty: "200 MT",
      amount: "$1,620,000",
      status: "Processing",
      image: "/rcn.webp",
    },
    {
      id: "#ORD-2024-8918",
      company: "Export House India",
      product: "RCN W240",
      qty: "120 MT",
      amount: "$954,000",
      status: "Processing",
      image: "/rcn w240.webp",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        <Link
          href="/orders"
          className="text-green-600 font-medium text-sm hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="divide-y">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center py-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={order.image}
                  alt={order.product}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  {order.id}
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  {order.company} • {order.product} • {order.qty}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-gray-800">{order.amount}</div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-md ${
                  order.status === "New"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
