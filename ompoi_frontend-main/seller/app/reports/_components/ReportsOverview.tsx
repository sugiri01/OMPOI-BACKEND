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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader className="flex justify-between items-center mb-4">
            <CardTitle className="text-lg font-bold">
              Revenue & Orders
            </CardTitle>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Export PNG
            </Button>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64 text-gray-400">
            Chart placeholder (connect to chart lib)
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center mb-4">
            <CardTitle className="text-lg font-bold">Report Library</CardTitle>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Quick Run
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-semibold">
                    Report Name
                  </th>
                  <th className="text-left py-2 text-sm font-semibold">Type</th>
                  <th className="text-left py-2 text-sm font-semibold">
                    Last Run
                  </th>
                  <th className="text-left py-2 text-sm font-semibold">
                    Owner
                  </th>
                  <th className="text-left py-2 text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 text-sm">{report.name}</td>
                    <td className="py-2 text-sm text-gray-600">
                      {report.type}
                    </td>
                    <td className="py-2 text-sm text-gray-600">
                      {report.lastRun}
                    </td>
                    <td className="py-2 text-sm text-gray-600">
                      {report.owner}
                    </td>
                    <td className="py-2 text-sm flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Run
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
