"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  IconTrendingUp,
  IconPackage,
  IconClock,
  IconCheck,
} from "@tabler/icons-react";

export default function ReportsOverview() {
  const [reports] = useState([
    {
      name: "Monthly Sales Summary",
      type: "Finance",
      lastRun: "13 Oct 2025, 18:05",
      owner: "Sudhir",
    },
    {
      name: "Order SLA Compliance",
      type: "Order",
      lastRun: "12 Oct 2025, 11:42",
      owner: "Sumitha",
    },
    {
      name: "Inventory Aging (30/60/90)",
      type: "Inventory",
      lastRun: "10 Oct 2025, 09:12",
      owner: "Ops",
    },
  ]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-6">
        {[
          {
            title: "THIS MONTH REVENUE",
            value: "₹ 2.84M",
            trend: "8.1% MoM",
            color: "green",
          },
          {
            title: "ORDERS COVERED",
            value: "312",
            trend: "3.4%",
            color: "green",
          },
          {
            title: "AVG. FULFILLMENT TIME",
            value: "2.3 days",
            trend: "0.2d",
            color: "red",
          },
          {
            title: "ON-TIME DELIVERY",
            value: "97.6%",
            trend: "0.6%",
            color: "green",
          },
        ].map((metric, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div
                className={`flex items-center gap-1 text-${metric.color}-600 text-sm font-medium`}
              >
                <span>{metric.color === "green" ? "▲" : "▼"}</span>
                <span>{metric.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
