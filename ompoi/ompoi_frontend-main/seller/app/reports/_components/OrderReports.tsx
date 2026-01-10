"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function OrderReports() {
  const orderReports = [
    { report: "Daily Orders Summary", period: "Last 7 days", status: "Scheduled", generated: "-", action: "Run" },
    { report: "On-time Delivery Report", period: "Sep 2025", status: "Complete", generated: "02 Oct 2025", action: "Download" },
    { report: "Cancellation Analysis", period: "Q3 2025", status: "Needs Data", generated: "-", action: "Fix Filters" },
  ];

  return (
    <Card>
      <CardHeader className="flex justify-between items-center mb-4">
        <CardTitle className="text-lg font-bold">Order Reports</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            CSV
          </Button>
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-sm font-semibold">Report</th>
              <th className="text-left py-2 text-sm font-semibold">Period</th>
              <th className="text-left py-2 text-sm font-semibold">Status</th>
              <th className="text-left py-2 text-sm font-semibold">Generated</th>
              <th className="text-left py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderReports.map((r, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2 text-sm">{r.report}</td>
                <td className="py-2 text-sm text-gray-600">{r.period}</td>
                <td className="py-2 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      r.status === "Complete"
                        ? "bg-green-100 text-green-700"
                        : r.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-2 text-sm text-gray-600">{r.generated}</td>
                <td className="py-2 text-sm flex gap-2">
                  <Button
                    variant={r.action === "Fix Filters" ? "outline" : "default"}
                    size="sm"
                    className={`${
                      r.action === "Fix Filters"
                        ? "border-green-600 text-green-600 hover:bg-green-50"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {r.action}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
