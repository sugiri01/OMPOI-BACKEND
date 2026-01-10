"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function SavedReports() {
  const savedViews = [
    { name: "Chennai DC – Last 30 Days", filters: "Inventory, Delivered, Top SKUs", created: "05 Oct 2025" },
    { name: "High Value Orders", filters: "Order > ₹5L, Processing", created: "01 Oct 2025" },
  ];

  return (
    <Card>
      <CardHeader className="flex justify-between items-center mb-4">
        <CardTitle className="text-lg font-bold">Saved Views</CardTitle>
        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
          Manage
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-sm font-semibold">Name</th>
              <th className="text-left py-2 text-sm font-semibold">Filters</th>
              <th className="text-left py-2 text-sm font-semibold">Created</th>
              <th className="text-left py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedViews.map((view, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2 text-sm">{view.name}</td>
                <td className="py-2 text-sm text-gray-600">{view.filters}</td>
                <td className="py-2 text-sm text-gray-600">{view.created}</td>
                <td className="py-2 text-sm flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Load
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Delete
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
