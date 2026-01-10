"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function TopProducts() {
  const topProducts = [
    {
      name: "Raw Cashew Nuts - W320 Grade",
      orders: 12,
      sold: "680 MT",
      revenue: "$5.3M",
      badge: "Best Seller",
      image: "/raw.webp",
    },
    {
      name: "Raw Cashew Nuts - W240 Grade",
      orders: 8,
      sold: "520 MT",
      revenue: "$4.2M",
      badge: "Trending",
      image: "/raw.webp",
    },
    {
      name: "Cashew Kernels - W320 White Wholes",
      orders: 4,
      sold: "125 MT",
      revenue: "$1.6M",
      badge: "Premium",
      image: "/kernel.webp",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Top Performing Products
        </h3>
        <Link
          href="/products"
          className="text-green-600 font-medium text-sm hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="divide-y">
        {topProducts.map((product, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  {product.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {product.orders} orders • {product.sold} sold •{" "}
                  {product.revenue} revenue
                </div>
              </div>
            </div>

            <span
              className={`text-xs font-medium px-2 py-1 rounded-md ${
                product.badge === "Best Seller"
                  ? "bg-green-100 text-green-700"
                  : product.badge === "Trending"
                  ? "bg-green-100 text-green-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {product.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
