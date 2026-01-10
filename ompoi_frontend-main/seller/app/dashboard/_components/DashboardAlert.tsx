"use client";

import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function DashboardAlert() {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <AlertDescription>
  <div className="flex flex-col md:flex-row items-start md:items-start justify-between w-full">
    <div className="flex items-start gap-3">
      <span className="text-2xl">🎉</span>
      <div>
        <div className="flex items-center justify-between w-full">
          <strong className="text-blue-900 text-base">
            8 New Orders Awaiting Action!
          </strong>
        </div>
        <p className="text-blue-800 text-sm">
          You have pending orders worth $4.68M. Accept them within 24 hours
          to maintain your seller rating.
        </p>
      </div>
    </div>

    <Link
      href="/orders"
      className="text-blue-600 font-semibold text-sm hover:underline self-start md:self-center whitespace-nowrap md:ml-4"
    >
      View Orders →
    </Link>
  </div>
</AlertDescription>

    </Alert>
  );
}
