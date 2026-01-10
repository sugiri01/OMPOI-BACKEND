"use client";
import { IconCheck } from "@tabler/icons-react";
import React from "react";

export function DocumentsHeader() {
  return (
    <div>
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              O
            </div>
            <span className="font-bold text-xl">OMPOI Seller Platform</span>
          </div>
          <div className="flex gap-6 text-sm font-semibold">
            <button className="text-gray-700 hover:text-green-600">
              Support
            </button>
            <button className="text-gray-700 hover:text-green-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center-safe">
          <div className="text-sm text-gray-600 font-semibold">Registration Steps:</div>
          <div className="flex items-center flex-wrap gap-4 [&>button]:rounded-full [&>button]:text-xs">
            <button className="px-2 py-1 bg-gray-100 text-gray-500 outline">
              1. Reg Details
            </button>
            <button className="px-2 py-1 bg-gray-100 text-gray-500 outline">
              2. Bank Details
            </button>
            <button className="px-2 py-1 bg-gray-100 text-gray-500 outline">
              3. Product Catalog
            </button>
            <button className="px-2 py-1 bg-teal-50 text-teal-700 border border-teal-500  font-medium">
              4. Documents
            </button>
            <button className="px-2 py-1 bg-white outline">
              5. Verification
            </button>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-b border-green-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-green-800">
          <IconCheck className="w-5 h-5" />
          <span> Product Catalog details saved successfully! Continue Documents.</span>
        </div>
      </div>
    </div>
  );
}
