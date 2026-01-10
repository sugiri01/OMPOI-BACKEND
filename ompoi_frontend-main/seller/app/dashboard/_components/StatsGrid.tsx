"use client";

import React from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import { IconBox, IconStar, IconStarFilled, IconTax, IconUsers } from "@tabler/icons-react";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
            <IconTax stroke={2} />
          </div>
          <div>
            <div className="text-2xl font-bold">$89.2K</div>
            <div className="text-sm text-gray-600">TOTAL REVENUE (OCT)</div>
          </div>
        </div>
        <div className="text-green-600 text-sm font-medium flex items-center gap-1">
          <TrendingUp className="w-4 h-4"/> 18% from last month
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
            <IconBox stroke={2}/>
          </div>
          <div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-gray-600">TOTAL ORDERS</div>
          </div>
        </div>
        <div className="text-green-600 text-sm font-medium flex items-center gap-1">
          <TrendingUp className="w-4 h-4" /> 12% from last month
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">
            <IconStar stroke={2}/>
          </div>
          <div>
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm text-gray-600">SELLER RATING</div>
          </div>
        </div>
        <div className="text-green-600 text-sm font-medium flex items-center gap-1">
          <TrendingUp className="w-4 h-4" /> 0.2 improvement
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
            <IconUsers stroke={2}/>
          </div>
          <div>
            <div className="text-2xl font-bold">87</div>
            <div className="text-sm text-gray-600">ACTIVE BUYERS</div>
          </div>
        </div>
        <div className="text-green-600 text-sm font-medium flex items-center gap-1">
          <TrendingUp className="w-4 h-4" /> 8 new this month
        </div>
      </div>
    </div>
  );
}
