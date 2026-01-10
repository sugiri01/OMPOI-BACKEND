"use client";
import React from "react";

export default function RegistrationProgress({ progress }: { progress: number }) {
  return (
    <div className="border-b px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center-safe">
        <div className="text-sm text-gray-600 font-semibold">Registration Steps:</div>
        <div className="flex items-center flex-wrap gap-4">
          <button className="px-2 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium border border-teal-500">
            1. Reg Details
          </button>
          <button className="px-2 py-1 bg-white outline text-gray-600 rounded-full text-xs">
            2. Bank Details
          </button>
          <button className="px-2 py-1 bg-white outline text-gray-600 rounded-full text-xs">
            3. Product Catalog
          </button>
          <button className="px-2 py-1 bg-white outline text-gray-600 rounded-full text-xs">
            4. Documents
          </button>
          <button className="px-2 py-1 bg-white outline text-gray-600 rounded-full text-xs">
            5. Verification
          </button>
        </div>
      </div>
    </div>
  );
}
