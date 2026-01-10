"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IconLock, IconPhone } from "@tabler/icons-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function BankStatusCard() {
  return (
    <div className="sticky">
      <Card className="shadow-sm top-4">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-bold ">Current Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm py-2">
            <span>Registration Details</span>
            <span className="text-green-600 font-semibold">Complete</span>
          </div>
          <div className="flex justify-between text-sm py-2 pb-4 border-b">
            <span>Bank Details</span>
            <span className="text-yellow-600 font-semibold">In Progress</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span>Verification</span>
            <span className="text-gray-500">Pending</span>
          </div>
        </CardContent>
      </Card>

      <Alert className="bg-yellow-50 border-yellow-200 my-6">
          <AlertDescription className="text-yellow-800 text-sm">
            <div className="flex gap-2">
              <span className="text-yellow-600 font-bold"><IconLock stroke={2} className="w-5 h-5"/></span>
              <div>
                <strong>Security Note</strong>
                <p className="mt-1">
                  Your bank details are encrypted and stored securely. We never share your financial information with third parties. OMPOI uses bank-grade security protocols.
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

      <Card>
        <CardHeader className="flex items-center">
          <IconPhone className="w-5 h-5 text-pink-600" />
          <p className="font-semibold">Need Help?</p>
        </CardHeader>
        <CardContent className="text-sm text-gray-700">
          <p>
            Support:{" "}
            <a href="" className="font-medium text-green-600">
              +91-461-2321023
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="" className="font-medium text-green-600">
              seller@ompoi.com
            </a>
          </p>
          <p>
            Working Hours:{" "}
            <span className="font-medium">Mon-Sat, 9 AM - 6 PM IST</span>{" "}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
