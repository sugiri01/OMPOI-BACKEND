"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function InventoryFilters() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search products by name, grade, or origin..."
          className="pl-10 pr-4 py-2"
        />
      </div>
    </div>
  );
}
