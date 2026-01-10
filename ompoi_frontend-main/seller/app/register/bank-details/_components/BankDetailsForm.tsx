"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IconLock } from "@tabler/icons-react";
import { IconBulb } from '@tabler/icons-react';

export default function BankDetailsForm({
  formData,
  handleChange,
  accountMismatch,
}: {
  formData: any;
  handleChange: (name: string, value: string) => void;
  accountMismatch: boolean;
}) {
  return (
    <Card className="col-span-2 shadow-sm">
      <CardHeader className="flex items-center justify-between pt border-b">
        <CardTitle className="text-2xl font-bold">Bank Account Details</CardTitle>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          Step 2 of 5
        </span>
      </CardHeader>

      <CardContent className="space-y-8">
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-800 text-sm">
            <div className="flex items-center gap-2 mb-1">
            <IconLock className="w-5 h-5 text-yellow-600" />
            <p className="font-semibold text-yellow-900">Payout Account:</p>
            </div>
            <p>This bank account will be used for payouts from OMPOI.</p>
          </AlertDescription>
        </Alert>

        <div>
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>

          <div className="space-y-4">
            <div>
              <Label>Account Holder Name <span className="text-red-500">*</span></Label>
              <Input
                placeholder="Name as per bank records"
                value={formData.accountHolderName}
                onChange={(e) => handleChange("accountHolderName", e.target.value)}
                className="mt-2 bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Account Number <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="Your account number"
                  value={formData.accountNumber}
                  onChange={(e) => handleChange("accountNumber", e.target.value)}
                  className="mt-2 bg-gray-100"
                />
              </div>
              <div>
                <Label>Re-enter Account Number <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="Confirm account number"
                  value={formData.reenterAccountNumber}
                  onChange={(e) => handleChange("reenterAccountNumber", e.target.value)}
                  className={`mt-2 ${accountMismatch ? "border-red-500" : ""} bg-gray-100`}
                />
                {accountMismatch && (
                  <p className="text-red-600 text-xs mt-1">
                    Account numbers do not match
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>IFSC / SWIFT Code <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="SBIN0000123"
                  value={formData.ifscCode}
                  onChange={(e) => handleChange("ifscCode", e.target.value)}
                  className="mt-2 bg-gray-100"
                />
              </div>
              <div>
                <Label>Bank Name <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="Example: SBI"
                  value={formData.bankName}
                  onChange={(e) => handleChange("bankName", e.target.value)}
                  className="mt-2 bg-gray-100"
                />
              </div>
            </div>

            <div>
              <Label>Account Type</Label>
              <Select
                onValueChange={(v) => handleChange("accountType", v)}
                value={formData.accountType}
              >
                <SelectTrigger className="mt-2 bg-gray-100">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="current">Current Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 pt-6 border-t">Address Proof (of Bank)</h3>
          <Label>Bank Branch Address<span className="text-red-500">*</span></Label>
          <Textarea
            rows={3}
            placeholder="Full address of the bank branch"
            value={formData.bankBranchAddress}
            onChange={(e) => handleChange("bankBranchAddress", e.target.value)}
            className="mt-2 resize-none bg-gray-100"
          />
        </div>

        <div className="border-t pt-4 flex items-start gap-2 mb-1">
          <IconBulb stroke={2} className=" text-yellow-500"/>
          <p className="text-gray-500"><small>For security, we require a canceled cheque or bank statement (from the last 3 months) to be uploaded in the **Documents** step.</small></p>
        </div>
      </CardContent>
    </Card>
  );
}
