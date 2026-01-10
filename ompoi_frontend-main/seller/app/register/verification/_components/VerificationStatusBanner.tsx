"use client";
import React from "react";
import { Clock } from "lucide-react";

export function VerificationStatusBanner() {
  return (
    <div className="bg-blue-50 border-b border-blue-200 px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        <span className="text-sm text-blue-800 font-medium">
          Your profile is currently under review by the OMPOI Verification Team.
        </span>
      </div>
    </div>
  );
}
