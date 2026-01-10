"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

export function VerificationChecklist() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold mb-6">Registration Checklist</h3>

      <div className="space-y-4">
        {[
          ["1. Reg Details", "Complete"],
          ["2. Bank Details", "Complete"],
          ["3. Product Catalog", "Complete"],
          ["4. Documents Uploaded", "Complete"],
        ].map(([label, status]) => (
          <div
            key={label}
            className="flex justify-between items-center pb-3 border-b"
          >
            <span className="text-sm font-medium">{label}</span>
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              {status}
            </span>
          </div>
        ))}

        <div className="flex justify-between items-center pt-2">
          <span className="text-sm font-medium">5. Verification Status</span>
          <span className="text-blue-600 text-sm font-semibold">In Review</span>
        </div>
      </div>
    </div>
  );
}
